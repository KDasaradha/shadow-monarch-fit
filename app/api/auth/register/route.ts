// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// // Initialize Prisma (avoid creating multiple instances)
// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password, name } = await req.json();

//     if (!email?.trim() || !password?.trim() || !name?.trim()) {
//       return NextResponse.json(
//         { error: "Email, password, and name are required." },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await prisma.user.count({ where: { email } });
//     if (existingUser > 0) {
//       return NextResponse.json(
//         { error: "This email is already registered." },
//         { status: 409 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//         level: 1,
//         xp: 0,
//         rank: "E-Rank",
//         strength: 10,
//         stamina: 10,
//         agility: 10,
//         intelligence: 10,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Registration successful!",
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           level: user.level,
//           xp: user.xp,
//           rank: user.rank,
//           strength: user.strength,
//           stamina: user.stamina,
//           agility: user.agility,
//           intelligence: user.intelligence,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again later." },
//       { status: 500 }
//     );
//   }
// }

// // Ensure Prisma disconnects when the app shuts down (avoids repeated connections)
// process.on("beforeExit", async () => {
//   await prisma.$disconnect();
// });


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma (avoid creating multiple instances in hot reloads)
const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // Ensure this API route is treated as dynamic

export async function POST(req: NextRequest) {
  try {
    // Parse JSON request body
    const body = await req.json();
    const { email, password, name } = body;

    // Validate required fields
    if (!email?.trim() || !password?.trim() || !name?.trim()) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 409 }
      );
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        level: 1,
        xp: 0,
        rank: "E-Rank",
        strength: 10,
        stamina: 10,
        agility: 10,
        intelligence: 10,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful!",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          level: user.level,
          xp: user.xp,
          rank: user.rank,
          strength: user.strength,
          stamina: user.stamina,
          agility: user.agility,
          intelligence: user.intelligence,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects to prevent resource leaks
  }
}