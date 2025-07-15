import {
    Typography,
} from "@material-tailwind/react";

type MenuItemProps = {
    title: string
}

export const MenuInfo = ({ title }: MenuItemProps) => {
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
                className="mr-4 py-1.5 text-sm font-bold font-extrabold text-primary-foreground"
            >
                {title}
            </a>
        </Typography>
    )
}