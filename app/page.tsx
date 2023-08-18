
import AdminChat from "../components/AdminChat";
import UserChat from "../components/UserChat";
export default function Home() {
  const adminId = "admin1";
  const userId = "user1";
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div>
        <p>User Chat</p>
        <UserChat userId={userId} />
      </div>
      <div>
        <h1>Admin Chat</h1>
        <AdminChat userId={adminId} />
      </div>
    </main>
  );
}
