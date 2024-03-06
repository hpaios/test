/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable no-new */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { Server, Model, Factory, hasMany, RestSerializer } from 'miragejs'

import faker from 'Faker'
import seedrandom from 'seedrandom'

const IdSerializer = RestSerializer.extend({
  'serializeIds': 'always',
})

const useSeededRNG = false

let rng = seedrandom()

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  rng = seedrandom(randomSeedString)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

const todoTemplates = [
  { 'base': 'Buy $THING', 'values': ['milk', 'bread', 'cheese', 'toys'] },
  { 'base': 'Clean $THING', 'values': ['house', 'yard', 'bedroom', 'car'] },
  { 'base': 'Read $THING', 'values': ['newspaper', 'book', 'email'] },
]

const generateTodoText = () => {
  const template = randomFromArray(todoTemplates)
  const value = randomFromArray(template.values)
  return template.base.replace('$THING', value)
}

new Server({
  routes() {
    this.namespace = 'fakeApi'
    this.timing = 2000

    this.resource('todos')
    this.resource('lists')

    // eslint-disable-next-line consistent-this
    const server = this

    this.post('/todos', function (schema, req) {
      const data = this.normalizedRequestAttrs()

      if (data.text === 'error') {
        throw new Error('Could not save the todo!')
      }

      return server.create('todo', data)
    })
  },
  'models': {
    'todo': Model.extend({}),
    'list': Model.extend({
      'todos': hasMany(),
    }),
  },
  'factories': {
    'todo': Factory.extend({
      'id': Number,
      text() {
        return generateTodoText()
      },
      completed() {
        return false
      },
    }),
  },
  'serializers': {
    'todo': IdSerializer.extend({
      serialize(object, request) {
        const numerifyId = (todo) => {
          todo.id = Number(todo.id)
        }
        // eslint-disable-next-line prefer-rest-params, max-len
        const json = Reflect.apply(IdSerializer.prototype.serialize, this, arguments)

        if (json.todo) {
          numerifyId(json.todo)
        } else if (json.todos) {
          json.todos.forEach(numerifyId)
        }

        return json
      },
    }),
    'list': IdSerializer,
  },
  seeds(server) {
    server.createList('todo', 5)
  },
})
