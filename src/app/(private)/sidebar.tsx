"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import { useUser } from "@/contexts/userContext";
import { Spinner } from "@/components/spinner";
import { menuItems } from "@/constants/menuItems";

export function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { userData } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = useCallback((menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }, []);

  const hasAccess = useCallback((requiredLevels: string[]) => {
    return requiredLevels.includes(userData?.nivelAcesso || "");
  }, [userData?.nivelAcesso]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => hasAccess(item.accessLevels));
  }, [hasAccess]);

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem('userData');
      await signOut({ callbackUrl: '/entrar' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, []);

  if (!userData || loading) {
    return (
      <div className="fixed top-0 left-0 z-50 flex flex-col h-screen w-64 bg-card border-r border-border shadow-lg items-center justify-center">
        <Spinner />
        <p className="mt-4 text-sm text-muted-foreground">Carregando menu...</p>
      </div>
    );
  }

  return (
    <>
      {/* Botão hamburguer para mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-md md:hidden"
        onClick={() => setSidebarVisible(prev => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-card-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 flex flex-col h-screen w-64 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl font-bold">+</span>
            <a href="/" className="text-xl font-semibold text-card-foreground">
              safe LINE
            </a>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Painel de Controle
          </h3>

          <nav className="flex flex-col gap-1">
            {filteredMenuItems.map((item) => (
              <div key={item.title} className="flex flex-col">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span>{item.title}</span>
                      </div>
                      {openMenus[item.title] ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                    {openMenus[item.title] && (
                      <div className="ml-8 flex flex-col border-l-2 border-border pl-2 my-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className="px-4 py-2 rounded-lg text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.path ? (
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>{item.title}</span>
                  </Link>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-2.5 font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
