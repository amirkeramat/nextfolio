import { auth, signOut } from "@/auth";
const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="text-white">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">خروج</button>
      </form>
    </div>
  );
};

export default DashboardPage;
