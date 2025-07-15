//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { useUser } from "@/contexts/userContext";
import { MenuItem } from "../MenuItem/MenuItem";
import { MenuInfo } from "../MenuInfo/MenuInfo";
import { NivelAcesso } from "@prisma/client";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const { userData } = useUser()


  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem("userData");
      await signOut({ redirectTo: "/entrar", redirect: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"></ul>
  );

  const isIT = userData.nivelAcesso === NivelAcesso.TI

  return (
    <Navbar
      className="sticky top-0 z-10 h-max bg-primary max-w-full rounded-none border-0 px-4 py-2 lg:px-8 lg:py-4"
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        {isIT ? <div className="flex">
          <MenuItem href="/hospitais/formulario/cadastro" title="Novo Hospital" />
          <MenuItem href="/usuarios/formulario/cadastro" title="Novo Usuário" />
          <MenuItem href="/reports" title="Relatórios" />
        </div> : <div>
          <div className="flex">
            <MenuItem href="/" title="Painel" />
            <MenuItem href="/pacientes/formulario/cadastro" title="Novo Motorista" />
            <MenuItem href="/reports" title="Relatórios" />
          </div>
        </div>}



        <div className="flex items-center">
          {isIT ? <></> : <div>
            <MenuInfo title={userData.nomeCompleto} />
            <MenuInfo title={userData.hospital.nome} />
          </div>}

          <div className="flex items-center gap-x-1 bg-[#fff] rounded-2xl">
            <Button
              onClick={handleLogout}
              variant="gradient"
              className="hidden lg:inline-block"
              color="white"
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <span>Sair</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
