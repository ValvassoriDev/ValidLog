import {
    Typography,
} from "@material-tailwind/react";


type MenuItemProps = {
    href: string
    title: string
}

export const MenuItem = ({ href, title }: MenuItemProps) => {
    return (
        <Typography
            as="li"
            variant="small"
            className="p-1 font-bold"
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}                  >
            <a
                href={href}
                className="mr-4 cursor-pointer py-1.5 text-2xl font-bold font-extrabold text-primary-foreground"
            >
                {title}
            </a>
        </Typography>
    )
}