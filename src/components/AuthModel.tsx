'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';

const AuthModel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <Input />
            </DialogContent>
        </Dialog>
    );
};

export default AuthModel;
