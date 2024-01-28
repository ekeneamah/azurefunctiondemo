// src/InsertFunction/app.ts

import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { connect, sql } from '../shared/db';

interface RequestBody {
  name: string;
  address: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await connect();

    const requestBody: RequestBody = req.body as RequestBody;

    const request = new sql.Request();
    const { name, address } = requestBody;

    await request.query(`INSERT INTO YourTableName (Name, Address) VALUES ('${name}', '${address}')`);

    await close();

    context.res = {
      status: 200,
      body: 'Hello World',
    };
  } catch (error) {
    console.error('Error:', error.message);
    context.res = {
      status: 500,
      body: 'Internal Server Error',
    };
  }
};

export default httpTrigger;
