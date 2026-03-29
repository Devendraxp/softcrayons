"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, MoreHorizontal, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteConfirmModal } from "@/components/ui/delete-confirm-modal";
import { toast } from "sonner";
import { SearchableSelect } from "@/components/dashboard/admin/tutorials/SearchableSelect";

type TutorialLesson = {
  id: number;
  title: string;
  slug: string;
  subtopicId: number;
  subtopic?: { title: string; topic?: { title: string } };
  position: number;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export default function TutorialLessonsPage() {
  const [lessons, setLessons] = useState<TutorialLesson[]>([]);
  
  // Cascading Filter State
  const [topics, setTopics] = useState<{label: string, value: string}[]>([]);
  const [subtopics, setSubtopics] = useState<{label: string, value: string}[]>([]);
  
  const [filterQuery, setFilterQuery] = useState("");
  const [filterTopicId, setFilterTopicId] = useState("");
  const [filterSubtopicId, setFilterSubtopicId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [deleteData, setDeleteData] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/tutorial-topics")
      .then(res => res.json())
      .then(d => { if(d.success) setTopics(d.data.map((c:any) => ({label: c.title, value: c.id.toString()}))); });
  }, []);

  useEffect(() => {
    setFilterSubtopicId("");
    if (!filterTopicId) {
        setSubtopics([]); return;
    }
    fetch(`/api/admin/tutorial-subtopics?topicId=${filterTopicId}`)
      .then(res => res.json())
      .then(d => { if(d.success) setSubtopics(d.data.map((t:any) => ({label: t.title, value: t.id.toString()}))); });
  }, [filterTopicId]);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const url = filterSubtopicId ? `/api/admin/tutorial-lessons?subtopicId=${filterSubtopicId}` : `/api/admin/tutorial-lessons`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setLessons(data.data);
      }
    } catch (error) {
      toast.error("Failed to load lessons.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [filterSubtopicId]);

  const handleDelete = async () => {
    if (!deleteData) return;
    try {
      const response = await fetch(`/api/admin/tutorial-lessons/${deleteData}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setLessons(lessons.filter((l) => l.id !== deleteData));
        toast.success("Lesson deleted");
      } else throw new Error(data.error);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleteData(null);
    }
  };

  const filtered = lessons.filter((l) => {
    const q = filterQuery.toLowerCase();
    return l.title.toLowerCase().includes(q) || l.slug.toLowerCase().includes(q);
  });

  return (
    <div className="w-full max-w-[98%] mx-auto p-4 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tutorial Lessons</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/tutorials/lessons/new"><Plus className="mr-2 h-4 w-4" /> New Lesson</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search lessons..." value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} className="pl-9" />
        </div>
        <div>
          <SearchableSelect items={topics} value={filterTopicId} onValueChange={setFilterTopicId} placeholder="Filter Topic..." />
        </div>
        <div>
          <SearchableSelect items={subtopics} value={filterSubtopicId} onValueChange={setFilterSubtopicId} placeholder="Filter Subtopic..." disabled={!filterTopicId} />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Lesson</TableHead>
                <TableHead>Parent Subtopic</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Public</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="h-24 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No lessons found.</TableCell></TableRow>
              ) : (
                filtered.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted"><FileText className="h-4 w-4 text-muted-foreground" /></div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{lesson.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{lesson.subtopic?.title || <span className="text-muted-foreground">Unknown</span>}</div>
                    </TableCell>
                    <TableCell>Pos: {lesson.position}</TableCell>
                    <TableCell>
                      <Switch checked={lesson.isPublic} disabled /> 
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild><Link href={`/dashboard/admin/tutorials/lessons/${lesson.id}/edit`}><Edit className="mr-2 h-4 w-4" /> Edit</Link></DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => { setDeleteData(lesson.id); }}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteConfirmModal open={!!deleteData} onOpenChange={(v) => !v && setDeleteData(null)} onConfirm={handleDelete} title="Delete Lesson" description="Are you sure you want to permanently delete this lesson?" />
    </div>
  );
}