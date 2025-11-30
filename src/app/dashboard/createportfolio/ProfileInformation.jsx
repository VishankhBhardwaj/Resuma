import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpIcon, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import 'animate.css';

const ProfileInformation = () => {
  const [links, setLinks] = useState([
    { platform: "", url: "" }
  ]);

  const AddLink = () => {
    setLinks([...links, { platform: "", url: "" }])
  }
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };
  return (
    <div className="min-h-screen p-6 flex flex-col border border-gray-200 rounded-xl shadow-md bg-white gap-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-black text-center font-bold text-xl lg:text-2xl">
          Profile Information
        </h1>

        <p className="text-gray-500 text-center text-md mb-6">
          Add your personal information to create your professional profile
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-2">
        <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
          <h1 className="font-bold text-lg">Profile Photo</h1>

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src="/img.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="upload"
                className="cursor-pointer flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                <Upload size={18} />
                <span className="font-medium text-sm">Upload Photo</span>
              </label>

              <input type="file" id="upload" className="hidden" />

              <p className="text-gray-400 text-sm mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>

          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
          <h1 className="text-black  font-bold text-lg">
            Basic Information
          </h1>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="fullname">Full Name</Label>
            <Input type="text" id="fullname" placeholder="John Doe" />
          </div>
          <div className="grid w-full  items-center gap-3">
            <Label htmlFor="title">Professional Title</Label>
            <Input type="text" id="title" placeholder="Full Stack Developer" />
          </div>
          <div className="grid w-full  items-center gap-3">
            <Label htmlFor="location">Location</Label>
            <Input type="text" id="location" placeholder="New York,NY" />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
        <h1 className="text-black  font-bold text-lg">
          Contact Information
        </h1>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-2">
          <div className="grid w-full  items-center gap-3">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="grid w-full  items-center gap-3">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="+1 123 456 7890"
          />
        </div>
        </div>

        <div className="grid w-full  items-center gap-3">
          <Label htmlFor="website">Website</Label>
          <Input
            type="url"
            id="website"
            placeholder="https://yourwebsite.com"
          />
        </div>

      </div>
      <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
        <h1 className="text-black font-bold text-lg">
          Professional Bio
        </h1>
        <p className="text-sm font-semibold text-gray-700">
          About You
        </p>
        <textarea
          id="bio"
          maxLength={500}
          placeholder="Write a brief description about yourself, your experience, and what you're passionate about..."
          className="w-full h-32 p-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none
    border-red-400 bg-red-50/20"   // remove red styling if no error
        />
        <p className="text-red-500 text-sm font-medium">
          Bio is required, at least 10 characters
        </p>

        <p className="text-gray-400 text-sm">0/500 characters</p>
      </div>
      <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-black  font-bold text-lg">
            Social Media Links
          </h1>
          <Button variant="outline" onClick={AddLink}><Plus /> Add Link</Button>
        </div>
        <div className=" w-full flex flex-col gap-2 animate__animated animate__fadeIn">
          {links.map((link, index) => (
            <div key={index} className="flex gap-3 items-center animate__animated animate__fadeIn">
              <input
                type="text"
                placeholder="Platform"
                className="border border-gray-200 rounded-lg p-2 w-[40%]"
              />
              <input
                type="url"
                placeholder="URL"
                className="border border-gray-200 rounded-lg p-2 w-[50%]"
              />
              <button onClick={() => removeLink(index)} className="w-[20%] border border-gray-200 flex items-center justify-center rounded-lg h-[100%]"><X /></button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
