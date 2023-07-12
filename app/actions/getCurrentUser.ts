import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  //direct communication with database through server components not an api call
  try {
    //try and catch block
    const session = await getSession(); //setting session from async function created

    if (!session?.user?.email) {
      //if not session, return null
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }; //motifying values from date to string.
  } catch (error: any) {
    return null; //throwing error if it's not currentUser so the code does not break
  }
}
