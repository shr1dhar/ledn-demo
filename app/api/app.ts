import express from 'express'
import swaggerUi from 'swagger-ui-express'

import bodyParser from 'body-parser'
import { RegisterRoutes } from '../build/routes'

import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa'

export const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

RegisterRoutes(app)

try {
  const swaggerDocument = require('/app/build/swagger.json')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} catch (err) {
  console.log('Unable to load swagger.json', err)
}

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)

    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
