"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "../components/Heading";
import Header from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {}

const Page = () => {
  const [configId, setConfigId] = useState<string>("");
  const [data, setData] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState<{ configId?: string; remark?: string }>({});

  const validateInputs = () => {
    const newErrors: { configId?: string; remark?: string } = {};

    if (!configId) {
      newErrors.configId = "Config ID is required.";
    } else if (configId.length < 2) {
      newErrors.configId = "Config ID must be at least 2 characters.";
    }

    if (!remark) {
      newErrors.remark = "Remark is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!validateInputs()) return;
      setLoading(true);
      const config = await axios.put(
        `https://coderowerassignment-backend.onrender.com/api/configaritions/${configId}`,
        { remark }
      );

      setData(config?.data?.message);
      toast.success("Remark Updated Successfully");
    } catch (err: any) {
      setData("");
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (configId && configId.length > 1 && remark && remark.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [configId, configId.length, remark, remark.length]);
  return (
    <div className="min-h-screen">
      <Heading
        title={`Update Remark`}
        description="Assignment"
        keywords="Programming, MERN, Backend"
      />
      <Header />

      <div className="mt-[25vh]">
        <div className="text-[32px] font-bold text-center text-blue-600">
          Update Config
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center mt-10 gap-5">
          <div>Config to Update (configId):</div>
          <div>
            <input
              type="text"
              name="text"
              onChange={(e) => setConfigId(e.target.value)}
              className="pl-3"
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center mt-10 gap-5">
          <div>Remark:</div>
          <div>
            <input
              type="text"
              name="text"
              onChange={(e) => setRemark(e.target.value)}
              className="pl-3"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-7">
          <div>demo Id: qwertyuiop</div>
          <button
            className={` text-white rounded-xl h-10 px-5  mt-3  ${
              isDisabled ? "bg-blue-400" : "bg-blue-600"
            } ${isDisabled && "cursor-not-allowed"}`}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            {loading ? "...Loading" : "Submit"}
          </button>
        </div>

        <div className="flex items-center justify-center text center text-[28px] font-semibold mt-10 text-green-600">
          {data ? <h1>{data}</h1> : ""}
        </div>
      </div>
    </div>
  );
};

export default Page;
