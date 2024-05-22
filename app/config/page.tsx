"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "../components/Heading";
import Header from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {}

const Page: FC<Props> = () => {
  const [configId, setConfigId] = useState<string>("");
  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e:any) => {
    try{
        e.preventDefault()
        setLoading(true)
        const config = await axios.get(
          `http://localhost:4000/api/configaritions/${configId}`
        );
    
        setData(config?.data?.data);
        toast.success("Data fetched")
        
    }catch(err:any){
        setData([])
        const errorMessage = err.response?.data?.message || "Something went wrong";
        toast.error(errorMessage)
        
    }
    finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (configId && configId.length > 1) {
      setIsDisabled(false);
    }else{
        setIsDisabled(true)
    }
  }, [configId, configId.length]);



  return (
    <div className="h-[100vh]">
      <Heading
        title={`FAQ of E-Learning`}
        description="E-Learning is a platform for student"
        keywords="Programming, MERN, Backend"
      />
      <Header />
      <div className=" mt-[100px]">
        <div className="text-[32px] font-bold text-center text-blue-600">Fetch Config</div>

        <div className="flex justify-center items-center mt-10 gap-5">
          <div>Config to load (configId):</div>
          <div>
            <input
              type="text"
              name="text"
              onChange={(e) => setConfigId(e.target.value)}
              className="pl-3"
            />
          </div>
        </div>


        <div className="flex flex-col items-center justify-center mt-7">
          <div>demo Id: qwertyuiop</div>
          <button
            className={` text-white rounded-xl h-10 px-5  mt-3  ${
              isDisabled ? "bg-blue-400" : "bg-blue-600"
            } ${isDisabled && 'cursor-not-allowed'}`}
            disabled={isDisabled}
            onClick={handleSubmit}

          >
            {loading ? "...Loading" : "Submit"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        {data && data.length >1 &&
          data.map((row: any, index: any) => (
            
            <div key={index} style={{ marginBottom: "20px" }}>
              {/* <h3>{index}:</h3> */}
              <div>
                {row && row.length &&
                  row.map((symbol: any, i: any) => (
                    <span key={i} className="flex flex-col mr-2" >
                      {symbol} {","} 
                    </span>
                  ))}
              </div>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
