// src/components/login-form.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../utils/auth.store";
import { login } from "@/utils/auth.api";

export function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  // Local state for handling error
  const [serverError, setServerError] = useState("");

  // 1. Local state for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 2. Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Modern mutation hook without deprecated callbacks
  const mutation = useMutation({
    mutationFn: login,
  });

  // 4. Handle success with useEffect
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      console.log("✅ Login Success:", mutation.data);
      const user = mutation.data?.user;
      setUser(user); // Update global auth state
      navigate("/user/courses");
    }
  }, [mutation.isSuccess, mutation.data, setUser, navigate]);

  // 5. Handle errors with useEffect
  useEffect(() => {
    if (mutation.isError) {
      const err = mutation.error;
      const msg = err?.response?.data?.error || "Login failed";

      if (msg) {
        setServerError(msg);
      } else {
        setServerError("Login failed");
      }
    }
  }, [mutation.isError, mutation.error]);

  // 6. Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError(""); // Clear previous errors

    mutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                disabled={mutation.isPending}
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                disabled={mutation.isPending}
              />
              {serverError && <p className="text-red-500">{serverError}</p>}{" "}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}{" "}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
