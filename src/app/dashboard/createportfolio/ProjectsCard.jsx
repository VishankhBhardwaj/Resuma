import { FolderOpen, Plus, X, Github, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const ProjectsCard = ({ index, data, onChange, onRemove }) => {
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: data?.title || "",
    description: data?.description || "",
    demoLink: data?.demoLink || "",
    gitHubLink: data?.gitHubLink || "",
    technologies: "",
    file: null,
  });

  const [technologies, setTechnologies] = useState(
    data?.technologiesUsed || [],
  );
  useEffect(() => {
    onChange({
      title: formData.title,
      description: formData.description,
      demoLink: formData.demoLink,
      gitHubLink: formData.gitHubLink,
      technologiesUsed: technologies,
      file: formData.file,
    });
  }, [formData, technologies,onChange]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === "file" ? files[0] : value,
    }));
  };

  const handleTech = () => {
    if (!formData.technologies.trim()) return;
    setTechnologies((prev) => [...prev, formData.technologies.trim()]);
    setFormData((prev) => ({ ...prev, technologies: "" }));
  };

  const removeTech = (id) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-sm shadow-2xl gap-2 p-2 h-screen">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3 p-1 w-[90%] md:w-[30%]">
          <FolderOpen className="relative top-1" />
          <h1 className="font-bold text-md md:text-lg">Project #{index}</h1>
          <div className="bg-black text-white px-3 py-1 rounded-2xl text-xs ml-auto">
            Featured
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col h-32 p-1">
        <h1 className="font-semibold">Project Thumbnail</h1>
        <div className="flex gap-3 items-center h-full">
          <Image
            src={
              preview ||
              "https://cdn.pixabay.com/photo/2017/01/26/08/07/light-bulb-2010022_1280.jpg"
            }
            alt="Preview"
            width={128}
            height={80}
            className="h-20 w-32 object-cover rounded-md"
          />
          <Input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => {
              handleInputChange(e);
              const file = e.target.files[0];

              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 p-2 overflow-y-auto">
        <div className="grid gap-2">
          <Label>Project Title</Label>
          <Input
            id="title"
            placeholder="DevConnect"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid gap-2">
          <Label>Description</Label>
          <textarea
            id="description"
            placeholder="A social platform for developers..."
            value={formData.description}
            onChange={handleInputChange}
            className="h-32 p-4 border rounded-xl resize-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="grid gap-2 md:w-[50%]">
            <Label>
              <ExternalLink /> Demo URL
            </Label>
            <Input
              id="demoLink"
              placeholder="https://example.com"
              value={formData.demoLink}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2 md:w-[50%]">
            <Label>
              <Github /> GitHub URL
            </Label>
            <Input
              id="gitHubLink"
              placeholder="https://github.com/username/repo"
              value={formData.gitHubLink}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Technologies Used</Label>
          <div className="flex gap-2">
            <Input
              id="technologies"
              placeholder="React, Node.js, Supabase"
              value={formData.technologies}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleTech()}
            />
            <Button variant="ghost" size="icon" onClick={handleTech}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, id) => (
              <div
                key={id}
                className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100"
              >
                <span>{tech}</span>
                <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => removeTech(id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
