"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CertificationCard from "./CertificationCard";
import DatePicker from "@/components/ui/DatePicker";

const CertificationsSection = ({ addCerti, certi }) => {
    const [certName, setCertName] = useState("");
    const [org, setOrg] = useState("");
    const [date, setDate] = useState("");
    const [certifications, setCertifications] = useState([]);


    useEffect(() => {
        if (!certi) return;
        setCertifications(Array.isArray(certi) ? certi : []);

    }, [certi])
    const handleAddCertification = () => {
        if (!certName || !org || !date) return;

        const updated = [
            ...certifications,
            {
                id: Date.now(),
                name: certName,
                organization: org,
                date,
            },
        ];

        setCertifications(updated);
        addCerti(updated);

        setCertName("");
        setOrg("");
        setDate("");
    };


    const removeCertification = (id) => {
        const updated = certifications.filter(cert => cert.id !== id);
        setCertifications(updated);
        addCerti(updated);
    };


    return (
        <div className="flex flex-col gap-6">

            {/* ADD CERTIFICATION */}
            <div className="border p-6 rounded-xl">
                <h2 className="font-bold text-xl mb-4">Add Certification</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="mb-2 font-medium">Certification Name</p>
                        <Input
                            value={certName}
                            onChange={(e) => setCertName(e.target.value)}
                            placeholder="e.g. AWS Certified Solutions Architect"
                        />
                    </div>

                    <div>
                        <p className="mb-2 font-medium">Issuing Organization</p>
                        <Input
                            value={org}
                            onChange={(e) => setOrg(e.target.value)}
                            placeholder="e.g. Amazon Web Services"
                        />
                    </div>

                    <div>
                        <p className="mb-2 font-medium">Date Obtained</p>
                        <DatePicker value={date}
                            onChange={setDate} />
                    </div>
                </div>

                <Button
                    onClick={handleAddCertification}
                    className="mt-6 bg-black text-white"
                >
                    + Add Certification
                </Button>
            </div>

            <div className="space-y-3">
                {certifications.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        No certifications added yet
                    </p>
                )}

                {certifications.map((cert) => (
                    <CertificationCard
                        key={cert.id}
                        cert={cert}
                        onRemove={removeCertification}
                    />
                ))}
            </div>

        </div>
    );
};

export default CertificationsSection;
