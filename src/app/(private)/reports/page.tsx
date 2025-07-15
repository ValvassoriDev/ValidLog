"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { CustomButton } from "../../../components/Button/Button";
import { useRouter } from "next/navigation";
import { NivelAcesso } from "@prisma/client";
import { useUser } from "../../../contexts/userContext";

export default function Reports() {
    const router = useRouter()
    const { userData } = useUser()
    const isIT = userData?.nivelAcesso === NivelAcesso.TI

    return (
        <AuthGuard allowedRoles={BASE_ROUTES_ROLES.reports}>
            <div className="flex flex-col items-center gap-4 pt-[50px]">
                {!isIT && <>
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Cateters'
                        onClick={() => router.push('/cateteres')}
                    />
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Danulas'
                        onClick={() => router.push('/danulas')}
                    />
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Películas'
                        onClick={() => router.push('/peliculas')}
                    />
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Equipo'
                        onClick={() => router.push('/equipos')}
                    />
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Evoluções'
                        onClick={() => router.push('/evolucoes')}
                    />
                    <CustomButton
                        style="w-64 h-12"
                        disabled={false}
                        title='Medicações'
                        onClick={() => router.push('/medicacoes-risco')}
                    />
                </>}
                {isIT &&
                    <>
                        <CustomButton
                            style="w-64 h-12"
                            disabled={false}
                            title='Hospitais'
                            onClick={() => router.push('/hospitais')}
                        />
                        <CustomButton
                            style="w-64 h-12"
                            disabled={false}
                            title='Usuários'
                            onClick={() => router.push('/usuarios')}
                        />
                    </>}
            </div>
        </AuthGuard>
    );
}
