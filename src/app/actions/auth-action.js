"use server";

import { cookies } from "next/headers";

export async function loginAction(prevState, formData) {
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();

    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Email is not valid" };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must be at least 6 characters long",
        };
    }

    try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return { success: false, message: "Invalid email or password" };
        }

        const data = await response.json();
        const cookieStore = await cookies();
        console.log("data", data);

        if (data.access_token && data.refresh_token && data.user) {


            cookieStore.set("access_token", data.access_token, {
                httpOnly: true,
                path: "/",   // مهم جداً عشان يبان في كل الصفحات
                secure: process.env.NODE_ENV === "development", // في البروودكشن بس
                sameSite: "lax" // يمنع مشاكل الكروس سايت
            });

            cookieStore.set("refresh_token", data.refresh_token, {
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === "development",
                sameSite: "lax"
            });

            cookieStore.set("userType", data.user.userType, {
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === "development",
                sameSite: "lax"
            });


            return {
                success: true,
                message: "Login successful",
                redirect: "/dashboard" // Add redirect path
            };
        }

        return { success: false, message: "Unexpected response from server" };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: "Login failed. Please try again later." };
    }
}




export const getAuth = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const userType = cookieStore.get("userType")?.value;
    return { accessToken, refreshToken, userType };
}

