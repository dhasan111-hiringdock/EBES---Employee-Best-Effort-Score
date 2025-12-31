import { Hono } from "hono";
import type { HonoContext } from "./types";
import { z } from "zod";

const app = new Hono<HonoContext>();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Login endpoint
app.post("/api/auth/login", async (c) => {
  const db = c.env.DB;
  
  try {
    const body = await c.req.json();
    const { email, password } = LoginSchema.parse(body);

    // Find all accounts for email (case-insensitive)
    const usersRes = await db
      .prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?)")
      .bind(email)
      .all();

    const users = usersRes.results || [];
    if (!users.length) {
      console.error(`Login failed: User not found for email: ${email}`);
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Verify password across accounts and build choices
    const candidates: any[] = [];
    for (const row of users) {
      const u = row as any;
      if (u.password === password && u.is_active) {
        const role = u.email === 'ebes@gmail.com' ? 'super_admin' : u.role;
        candidates.push({
          id: u.id,
          email: u.email,
          name: u.name,
          role,
          user_code: u.user_code,
          is_active: u.is_active,
          created_at: u.created_at,
        });
      }
    }

    if (!candidates.length) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    return c.json({
      success: true,
      users: candidates,
      user: candidates[0],
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "An error occurred during login" }, 500);
  }
});

// Logout endpoint
app.post("/api/auth/logout", async (c) => {
  return c.json({ success: true });
});

export default app;
