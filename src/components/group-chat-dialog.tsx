'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ICON_SIZES, ICON_STROKE_WIDTH, PRIVATE_ROUTES } from '@/constants';
import { groupService } from '@/features/chat/services';
import { UserMultiSelect } from '@/features/user/components';
import { User } from '@/types';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  users: User[];
}

export const GroupChatDialog = ({ users }: Props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [isPending, setIsPending] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleCreate = async () => {
    setIsPending(true);
    if (!title.trim() || selectedUsers.length < 2) return;

    const res = await groupService.create(
      selectedUsers.map(u => u.id),
      title.trim(),
    );

    if (res.success) {
      router.push(`${PRIVATE_ROUTES.CHATS}/${res.data}`);
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }

    setIsPending(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <button className="text-icon hover:bg-icon-hover hover:text-icon-accent cursor-pointer gap-1 rounded-md p-2">
          <Plus
            size={ICON_SIZES.LG}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Group Name</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter group name..."
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Members ({selectedUsers.length} selected)</Label>
            <UserMultiSelect
              users={users}
              selectedUsers={selectedUsers}
              onSelectionChange={setSelectedUsers}
            />
            {selectedUsers.length < 2 && (
              <p className="text-muted-foreground text-xs">
                Select at least 2 members to create a group
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Group'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
