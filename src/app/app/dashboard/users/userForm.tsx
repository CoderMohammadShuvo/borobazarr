'use client';
import { Input } from '@components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import axios from 'axios';
import { Toaster } from '@components/ui/sonner';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createUser } from './_action';
import { UserFormSchema } from './UserFormSchema';
import Button from '@components/ui/button';

function UserForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      type: 'Stuff',
      status: 'Active',
    },
  });

  async function onSubmit(data: z.infer<typeof UserFormSchema>) {
    try {
      //@ts-ignore
      const newUser = await createUser(data);

      if (newUser) {
        toast.success('User Creation Success');
        revalidatePath('/dashboard/users');
        form.reset();
        //   router.back();
      } else {
        toast.error('User Creatation faield!');
      }
      // await axios.post('/api/user', data)
      // .then((res)=>{
      //   (res)
      //   // TODO:: SEND SMS WITH USER ID
      //   if(res?.data?.error?.code === "P2002"){
      //     let errorMassage = "Data Validation Error"
      //     const target = res?.data?.error?.meta?.target

      //     //  (target)

      //     if(target === "users_phone_key"){
      //         errorMassage = "This Phone is Already used"
      //     }else if(target === "users_email_key"){
      //         errorMassage = "This Email is Already used"
      //     }
      //     //  (errorMassage)
      //     toast.error(errorMassage)
      //   }else{

      //       toast.success("Create User Success")
      //   }

      // }).catch(error=>{
      // //    (error)
      //   if(error.data.error.code === "P2002"){
      //     let errorMassage = "Data Validation Error"
      //     const target = error.data.error.meta.target

      //     //  (target)

      //     if(target === "users_phone_key"){
      //         errorMassage = "This Phone is Already used"
      //     }else if(target === "users_email_key"){
      //         errorMassage = "This Email is Already used"
      //     }
      //     //  (errorMassage)
      //     toast.error(errorMassage)

      //   }else{
      //     toast.error("Create User Faild")
      //   }

      // })
      // .finally(()=>{
      //     redirect('/dashboard/users')
      // })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/6 space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="0168 XXXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Stuff" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Stuff">Stuff</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Active" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default UserForm;
