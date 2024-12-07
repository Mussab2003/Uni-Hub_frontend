"use client";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export function DeleteRepoDialog({ repoName, repoId, isOpen, onClose, token }) {
  const router = useRouter();
  const handleSubmit = async () => {
    try{
      console.log("In   delete dialog");
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: repoId,
          },
        }
      );
      console.log(response.data);
      onClose();
      router.push("/user-page");

    }catch(err){
      
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {repoName} will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSubmit}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
