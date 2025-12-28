'use client';

interface WrapperProps {
  children: React.ReactNode;
}

export default function AuthFormWrapper({ children }: WrapperProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black p-6">
      <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl">
        {children}
      </div>
    </div>
  );
}
