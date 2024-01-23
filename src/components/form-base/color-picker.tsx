import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Sketch } from '@uiw/react-color'
import { useState } from 'react'

interface Props {
    className?: string
    id?: string
}

export default function ColorPicker({ className }: Props) {
    const [hexa, setHexa] = useState('#d29c9c53')
    return (
        <Sketch
            className={className}
            style={{ marginLeft: 20 }}
            color={hexa}
            disableAlpha={true}
            onChange={(color) => {
                setHexa(color.hexa)
            }}
        />
    )
}

interface Props2 {
    color?: string
    triggerCls?: string
    contentCls?: string
    id?: string
    onChange?: (color: string) => void
}

export function ColorPickerPopup({
    color,
    triggerCls,
    contentCls,
    id,
    onChange,
}: Props2) {
    // const [hexa, setHexa] = useState(color)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    className={cn(
                        'w-11 h-4',
                        !color && 'border-dashed',
                        triggerCls
                    )}
                    variant="outline"
                    style={{ backgroundColor: color }}
                />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none">
                <Sketch
                    className={cn(contentCls)}
                    color={color}
                    onChange={(color) => {
                        // setHexa(color.hexa)
                        onChange && onChange(color.hexa)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
