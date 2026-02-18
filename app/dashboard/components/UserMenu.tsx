import Image from "next/image";

export default function UserMenu({ user }: any) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      <Image
        src={user.image}
        alt="Foto do usuário"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
