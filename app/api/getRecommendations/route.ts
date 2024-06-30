import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const movieName = searchParams.get('movieName');
    console.log(`Received movie name: ${movieName}`);

    if (!movieName) {
      return NextResponse.json({ error: "Movie name is required" }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(process.cwd(), 'backend', 'recommendations.py');
      const command = `python ${scriptPath} "${movieName}"`;
      console.log(`Running command: ${command}`);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Exec error: ${error.message}`);
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
          return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        try {
          const parsedOutput = JSON.parse(stdout.trim());
          resolve(NextResponse.json(parsedOutput));
        } catch (parseError: any) {
          console.error(`Parse error: ${parseError.message}`);
          reject(NextResponse.json({ error: "Error parsing recommendations" }, { status: 500 }));
        }
      });
    });
  } catch (err: any) {
    console.error(`Request processing error: ${err.message}`);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
