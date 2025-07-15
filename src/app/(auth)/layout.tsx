"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(to right, #c4f5eb, #80c9e4)',
      
      }}
    >
      <div className="w-full max-w-md bg-card rounded-4xl shadow-md border border-border p-16">
        {children}
      </div>
    </div>
  );
}
