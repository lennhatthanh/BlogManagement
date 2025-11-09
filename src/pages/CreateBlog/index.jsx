import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import UploadImageBlog from "@/components/UploadImageBlog";
import { createBlog } from "@/services/api/blog";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const [tags, setTags] = useState([]);
    const [tagValue, setTagValue] = useState("");
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleAddTag = () => {
        if (tagValue.length !== 0) {
            setTags([
                {
                    id: Date.now(),
                    name: tagValue,
                },
                ...tags,
            ]);
            setTagValue("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTag();
        }
    };
    const handleRemoveTag = (value) => {
        setTags(tags.filter((item) => item.id !== value.id));
    };

    const onUpload = (value) => {
        setFile(value);
    };
    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const result = await res.json();

        if (res.ok) {
            handleCreateBlog(result);
        } else {
            toast.success("Tải hình không thành công");
            setLoading(false);
        }
    };
    const handleCreateBlog = async (imageResult) => {
        try {
            await createBlog({
                title: title.trim(),
                image: imageResult.url,
                content: editorRef.current ? editorRef.current.getContent() : blog.content,
                tags: tags.map((item) => item.name),
            });
            if (!file || !editorRef.current.getContent() || !title || tags.length === 0) {
                toast.error("Nhập thiếu thông tin");
                return;
            }
            toast.success("Tải bài thành công!");
            setTitle("");
            setTags([]);
            setFile(null);
            editorRef.current.setContent("");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h2 className="hero-title text-3xl sm:text-6xl font-semibold sm:leading-[4rem] text-primary text-center mt-10 mb-8">
                📝 Create a New Blog
            </h2>
            <div className="grid gap-6">
                <div className="space-y-4">
                    <div className="grid gap-2  ">
                        <legend className="font-medium">Blog Image</legend>
                        <UploadImageBlog onUpload={onUpload} />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            data-slot="label"
                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                            for="title"
                        >
                            Blog Title
                        </Label>
                        <Input
                            onChange={(e) => setTitle(e.target.value)}
                            data-slot="input"
                            id=""
                            placeholder="Enter blog title"
                            value={title}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            data-slot="label"
                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                            for="title"
                        >
                            Blog Content
                        </Label>
                        <Editor
                            apiKey={import.meta.env.VITE_TINY_KEY}
                            onInit={(_evt, editor) => (editorRef.current = editor)}
                            init={{
                                plugins: [
                                    // Core editing features
                                    "anchor",
                                    "autolink",
                                    "charmap",
                                    "codesample",
                                    "emoticons",
                                    "link",
                                    "lists",
                                    "media",
                                    "searchreplace",
                                    "table",
                                    "visualblocks",
                                    "wordcount",
                                    // Your account includes a free trial of TinyMCE premium features
                                    // Try the most popular premium features until Nov 16, 2025:
                                    "checklist",
                                    "mediaembed",
                                    "casechange",
                                    "formatpainter",
                                    "pageembed",
                                    "a11ychecker",
                                    "tinymcespellchecker",
                                    "permanentpen",
                                    "powerpaste",
                                    "advtable",
                                    "advcode",
                                    "advtemplate",
                                    "ai",
                                    "uploadcare",
                                    "mentions",
                                    "tinycomments",
                                    "tableofcontents",
                                    "footnotes",
                                    "mergetags",
                                    "autocorrect",
                                    "typography",
                                    "inlinecss",
                                    "markdown",
                                    "importword",
                                    "exportword",
                                    "exportpdf",
                                ],
                                toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                tinycomments_mode: "embedded",
                                tinycomments_author: "Author name",
                                mergetags_list: [
                                    { value: "First.Name", title: "First Name" },
                                    { value: "Email", title: "Email" },
                                ],
                                ai_request: (request, respondWith) =>
                                    respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                uploadcare_public_key: "3dee3a5053d30c235031",
                            }}
                            initialValue="<p>This is the initial content of the editor.</p>"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Blog Tag</Label>
                        <div className="flex gap-2">
                            <Input
                                onKeyDown={handleKeyDown}
                                value={tagValue}
                                onChange={(e) => setTagValue(e.target.value)}
                                placeholder="Enter blog tag"
                                type="text"
                            />
                            <Button onClick={handleAddTag} data-slot="button" className="text-white">
                                Add Tag
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {tags.map((item) => (
                                <Badge
                                    onClick={() => handleRemoveTag(item)}
                                    className="cursor-pointer bg-primary text-white"
                                >
                                    {item.name}
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="tabler-icon tabler-icon-x cursor-pointer w-3 h-3"
                                        >
                                            <path d="M18 6l-12 12"></path>
                                            <path d="M6 6l12 12"></path>
                                        </svg>
                                    </span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full justify-center">
                        {loading ? (
                            <Button onClick={handleUpload} className="mx-auto text-white" disabled>
                                <Spinner /> Create Blog
                            </Button>
                        ) : (
                            <Button onClick={handleUpload} className="mx-auto text-white">
                                Create Blog
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
