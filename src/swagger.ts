import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { name, description, version, author } from '../package.json';

export const swaggerSpec = (
  getMetadataArgsStorage,
  routingControllersOptions,
  app) => {
  // Parse class-validator classes into JSON Schema:
  const schemas: any = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/'
  });

  // Parse routing-controllers classes into OpenAPI spec:
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [{ bearerAuth: [] }],
      info: {
        description: `${description}`,
        title: `${name}`,
        version: `${version}`
      }
    });
  /* http://localhost:3000/devenginec/user-auth/docs/ */
  app.use(`/${author}/${name}/docs`,
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(spec)
  );
};
