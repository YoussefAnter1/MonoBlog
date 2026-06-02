"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

const ProfileForm = ({ userId }: { userId: number }) => {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${DOMAIN}/api/users/profile/${userId}`,
        );
        setProfile(data);
        setUsername(data.username);
        setEmail(data.email);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error?.response?.data?.message || "Failed to fetch profile",
          );
        } else {
          toast.error("Failed to fetch profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const updateProfileHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const payload: { username: string; email: string; password?: string } = {
        username,
        email,
      };
      if (password) {
        payload.password = password;
      }

      await axios.put(`${DOMAIN}/api/users/profile/${userId}`, payload);
      toast.success("Profile updated successfully!");
      router.refresh(); // Refresh to update header username if changed
      setPassword(""); // Clear password field
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Failed to update profile",
        );
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteAccountHandler = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`${DOMAIN}/api/users/profile/${userId}`);
      toast.success("Account deleted successfully!");

      // Logout the user to clear auth cookies
      await axios.get(`${DOMAIN}/api/users/logout`);

      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Failed to delete account",
        );
      } else {
        toast.error("Failed to delete account");
      }
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="text-xl">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="text-xl text-red-500">Profile data not available.</div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
      <form onSubmit={updateProfileHandler} className="flex flex-col gap-4">
        <div>
          <label
            className="block text-gray-700 mb-1 font-semibold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 mb-1 font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 mb-1 font-semibold"
            htmlFor="password"
          >
            New Password (optional)
          </label>
          <input
            id="password"
            type="password"
            className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-600 text-white py-2 rounded-md font-bold mt-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div className="mt-10 border-t pt-5">
        <h2 className="text-xl font-bold text-red-600 mb-3">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={deleteAccountHandler}
          disabled={isDeleting}
          className="bg-red-600 text-white py-2 px-4 rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
