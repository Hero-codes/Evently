import React, { startTransition, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select';
import { ICategory } from '@/lib/database/models/category.model';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input';

interface DropdownProps {
    value?: string;
    onChangeHandler?: () => void;
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");

    const handleAddCategory = () => {

    }

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.length > 0 && categories.map((category) => (
                        <SelectItem
                            className='select-item p-regular-14'
                            value={category._id}
                            key={category._id} >
                            {category.name}
                        </SelectItem>
                    ))
                }

                <AlertDialog>
                    <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Open</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type='text'
                                    className='input-field mt-3'
                                    onChange={e => setNewCategory(e.target.value)}
                                    placeholder='Category Name' />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>
    )
}

export default Dropdown