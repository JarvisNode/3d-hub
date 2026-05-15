"use client";

import { Upload as UploadIcon, FileUp, Zap, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadPage() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [designFileName, setDesignFileName] = useState<string | null>(null);

  const [isSubmittingStl, setIsSubmittingStl] = useState(false);
  const [isSuccessStl, setIsSuccessStl] = useState(false);
  
  const [isSubmittingDesign, setIsSubmittingDesign] = useState(false);
  const [isSuccessDesign, setIsSuccessDesign] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleDesignFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDesignFileName(e.target.files[0].name);
    }
  };

  const handleSubmitStl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingStl(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add required fields for Web3Forms
    formData.append("access_key", "5ad63c28-59e5-4289-a5a6-dd17fc95c565");
    formData.append("subject", "New STL Print Quote Request from 3D Hub");

    try {
      // 1. Send Email via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        // 2. Save to Supabase Database
        const { error: dbError } = await supabase
          .from('orders')
          .insert([{
            customer_email: formData.get("customer_email"),
            type: 'STL',
            material: formData.get("material"),
            infill_density: formData.get("infill_density"),
            status: 'Pending',
            progress: 10
          }]);

        if (dbError) throw dbError;

        setIsSuccessStl(true);
        form.reset();
        setSelectedFileName(null);
        setTimeout(() => setIsSuccessStl(false), 5000);
      } else {
        console.error("Web3Forms error:", data);
        alert("Failed to submit form. Please make sure the file is under 5MB.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingStl(false);
    }
  };

  const handleSubmitDesign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingDesign(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append("access_key", "5ad63c28-59e5-4289-a5a6-dd17fc95c565");
    formData.append("subject", "New Custom Design Request from 3D Hub");

    try {
      // 1. Send Email via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        // 2. Save to Supabase Database
        const { error: dbError } = await supabase
          .from('orders')
          .insert([{
            customer_email: formData.get("customer_email"),
            type: 'Design',
            project_name: formData.get("project_name"),
            description: formData.get("description"),
            status: 'Reviewing',
            progress: 5
          }]);

        if (dbError) throw dbError;

        setIsSuccessDesign(true);
        form.reset();
        setDesignFileName(null);
        setTimeout(() => setIsSuccessDesign(false), 5000);
      } else {
        console.error("Web3Forms error:", data);
        alert("Failed to submit form. Please make sure the image is under 5MB.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingDesign(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Upload Your Model</h1>
        <p className="text-gray-400">Upload your STL file for printing or images for a custom design request.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* STL Upload Form */}
        <div className="glass p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileUp className="text-primary-neon" /> 3D Printing (STL)
          </h2>
          
          {isSuccessStl ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-12 text-center animate-in fade-in zoom-in duration-300 h-[400px] flex flex-col justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">File Uploaded Successfully!</h3>
              <p className="text-gray-400">We have received your file. Our team will review it and email you the exact quote shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitStl}>
              {/* USING HTML LABEL FOR NATIVE FILE UPLOAD SUPPORT */}
              <label 
                className={`block border-2 border-dashed ${selectedFileName ? 'border-primary/50 bg-primary/5' : 'border-white/20'} rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer mb-6`}
              >
                <input 
                  type="file" 
                  name="attachment"
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".stl,.obj,.3mf" 
                />
                {selectedFileName ? (
                  <div className="text-primary-neon font-medium flex flex-col items-center">
                    <FileUp className="w-12 h-12 mb-4" />
                    <p className="break-all">{selectedFileName}</p>
                    <p className="text-xs text-gray-500 mt-2">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium mb-1">Click to upload your 3D model</p>
                    <p className="text-sm text-gray-500">STL, OBJ, 3MF (Max 5MB)</p>
                  </div>
                )}
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email to receive Quote</label>
                  <input type="email" name="customer_email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-neon transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Material</label>
                  <select name="material" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-neon transition-colors">
                    <option>PLA</option>
                    <option>PETG</option>
                    <option>ABS</option>
                    <option>Resin (SLA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Infill Density</label>
                  <select name="infill_density" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-neon transition-colors">
                    <option>20% (Standard)</option>
                    <option>50% (Strong)</option>
                    <option>100% (Solid)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className={`w-full bg-primary text-white font-bold py-4 rounded-lg mt-4 hover:bg-primary/90 transition-colors flex justify-center items-center ${(!selectedFileName || isSubmittingStl) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!selectedFileName || isSubmittingStl}
                >
                  {isSubmittingStl ? "Uploading & Requesting Quote..." : "Get Instant Quote"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Custom Design Request Form */}
        <div className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full blur-2xl"></div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="text-secondary-neon" /> Custom Design Request
          </h2>
          <p className="text-gray-400 mb-6 text-sm">Need something modeled from scratch? Upload references or sketches and our engineers will create it.</p>
          
          {isSuccessDesign ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-12 text-center animate-in fade-in zoom-in duration-300 h-[350px] flex flex-col justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Request Sent Successfully!</h3>
              <p className="text-gray-400">Our engineers will review your requirements and email you back to discuss the custom design.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitDesign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
                <input type="email" name="customer_email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary-neon transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                <input type="text" name="project_name" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary-neon transition-colors" placeholder="e.g. Custom Drone Frame" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea name="description" required rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary-neon transition-colors" placeholder="Describe your idea, dimensions, and requirements..."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Reference Image (Optional)</label>
                {/* USING HTML LABEL FOR NATIVE FILE UPLOAD SUPPORT */}
                <label 
                  className={`block border-2 border-dashed ${designFileName ? 'border-secondary/50 bg-secondary/5' : 'border-white/20'} rounded-lg p-4 text-center hover:border-secondary/50 transition-colors cursor-pointer`}
                >
                  <input 
                    type="file" 
                    name="attachment"
                    onChange={handleDesignFileChange} 
                    className="hidden" 
                    accept="image/*,.pdf" 
                  />
                  {designFileName ? (
                    <div className="text-secondary-neon font-medium flex items-center justify-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      <p className="truncate max-w-[200px]">{designFileName}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Click to select an image</p>
                  )}
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingDesign}
                className={`w-full bg-secondary text-white font-bold py-4 rounded-lg mt-4 hover:bg-secondary/90 transition-colors flex justify-center items-center ${isSubmittingDesign ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmittingDesign ? "Sending Request..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
