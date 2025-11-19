import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-[50%] mr-[5vw]">

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[50vw]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Perfil</h4>
            <p className="text-muted-foreground text-sm">
              Detalhes da conta
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value="Carlos Eduardo"
                disabled
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value="cadu@gmail.com"
                disabled
                className="col-span-2 h-8"
              />
            </div>
            <hr />
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="New Password">New Password</Label>
              <Input
                id="New Password"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input
                id="Confirm Password"
                className="col-span-2 h-8"
              />
            </div>
            <Button>Change Password</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
