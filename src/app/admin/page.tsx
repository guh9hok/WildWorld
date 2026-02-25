import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function AdminPage() {
  const session = await auth();

  if (!session || (session.user as any).role !== "admin") {
    redirect("/");
  }

  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Admin Panel</h1>
          <p className="text-lg text-green-700">Manage users and assign moderator roles</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-emerald-600">
            <h2 className="text-xl font-bold text-white">All Users</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin" ? "bg-purple-100 text-purple-800" :
                        user.role === "moderator" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${(user.earnings / 100).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <form action={`/api/admin/update-role/${user.id}`} method="POST" className="flex gap-2">
                        <input type="hidden" name="role" value="user" />
                        <button
                          type="submit"
                          className={`px-2 py-1 rounded text-xs ${user.role === "user" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
                          disabled={user.role === "user"}
                        >
                          User
                        </button>
                        <input type="hidden" name="role" value="moderator" />
                        <button
                          type="submit"
                          className={`px-2 py-1 rounded text-xs ${user.role === "moderator" ? "bg-green-200 text-green-700 cursor-not-allowed" : "bg-green-100 hover:bg-green-200 text-green-700"}`}
                          disabled={user.role === "moderator"}
                        >
                          Mod
                        </button>
                        <input type="hidden" name="role" value="admin" />
                        <button
                          type="submit"
                          className={`px-2 py-1 rounded text-xs ${user.role === "admin" ? "bg-purple-200 text-purple-700 cursor-not-allowed" : "bg-purple-100 hover:bg-purple-200 text-purple-700"}`}
                          disabled={user.role === "admin"}
                        >
                          Admin
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {allUsers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}