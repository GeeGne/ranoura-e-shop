import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    // Insert a new row into the `Task` table
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null, // Optional field
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task: " + error },
      { status: 500 }
    );
  }
}