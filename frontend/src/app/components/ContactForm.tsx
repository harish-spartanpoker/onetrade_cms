"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState } from "react";
gsap.registerPlugin(useGSAP);
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { internalCall } from "../../../lib/axiosInstance";

const formSchema = yup.object({
  name: yup.string().max(50).required("Name is Required"),
  email: yup.string().email().required("Email is Required"),
  message: yup.string().max(1000).required("Message is Required"),
  phone: yup
    .string()
    .max(15, "Phone number must be at most 15 characters")
    .matches(
      /^\+[1-9]\d{7,14}$/,
      "Enter a valid international phone number (e.g., +1234567890)"
    )
    .when(["$afVisible"], (afVisible, schema) => {
      let afState = Array.isArray(afVisible) ? afVisible[0] : afVisible;
      if (afState) {
        return schema.required("Phone is Required");
      } else {
        return schema.notRequired();
      }
    }),
  country: yup
    .string()
    .max(30)
    .when(["$afVisible"], (afVisible, schema) => {
      let afState = Array.isArray(afVisible) ? afVisible[0] : afVisible;
      if (afState) {
        return schema.required("Country is Required");
      } else {
        return schema;
      }
    }),
  traffic: yup.string().max(100, "Traffic Type must be at most 100 characters"),
  platform: yup.string().max(100, "Platform must be at most 100 characters"),
});

export default function ContactForm() {
  const [afVisible, setAfVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    setError,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm({
    // mode: "onChange",
    resolver: yupResolver(formSchema),
    context: { afVisible },
  });
  useGSAP(() => {
    gsap.set(".customer-span", {
      autoAlpha: 0,
    });
    gsap.set(".form-arrow", {
      rotate: 180,
      xPercent: 300,
    });
  });

  const toggleForm = (e: any) => {
    e.preventDefault();
    if (afVisible) {
      // Animate form hiding
      gsap.to(".form-arrow", {
        rotate: 180,
        xPercent: 300,
        duration: 0.5,
      });
      gsap.to(".affiliate-span", {
        autoAlpha: 1,
        duration: 0.5,
      });
      gsap.to(".customer-span", {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => setAfVisible(false),
      });
    } else {
      // Animate form showing
      gsap.to(".form-arrow", { rotate: 0, xPercent: -300, duration: 0.5 });
      gsap.to(".affiliate-span", { autoAlpha: 0, duration: 0.5 });
      gsap.to(".customer-span", {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => setAfVisible(true),
      });
    }
  };

  const processForm = async (data: any) => {
    console.log("Form Submitted: ", data);
    const formResponse = await internalCall.post("/api/enquiry", data);
    console.group("\n === RESPNOSE FROM strapi  ===");
    console.log(formResponse.data);
    console.groupEnd();
    if (formResponse.data) {
      alert("Thankyou for your response, we'll get in touch with you soon");
      reset();
    } else {
      alert("Something went wrong, please try again later");
    }

    // Add your form submission logic here (e.g., send to an API endpoint)
  };

  return (
    <div className="bg-black bg-neutral-900 px-4 py-16 text-white">
      <div className="contact-form-inner-wrapper border-radius-primary mx-auto bg-black p-2 md:max-w-4xl md:p-6">
        <h2 className="text-light-gray mb-4 text-center font-sans text-2xl md:text-5xl">
          Got questions?
        </h2>
        <p className="text-muted mb-6 text-center text-base md:text-2xl">
          We're right here for you. Reach out and our support team will help you
          promptly!
        </p>
        <form onSubmit={handleSubmit(processForm)} className="mx-auto md:w-2/3">
          {afVisible ? (
            <>
              <div className="affiliate-form">
                <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <div className="element-wrapper basis-full">
                    <input
                      type="text"
                      {...register("name")}
                      id="name"
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Name/ User ID *"
                    />
                    {errors.name?.message && (
                      <p className="text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="element-wrapper basis-full">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Email *"
                    />
                    {errors.email?.message && (
                      <p className="text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <div className="element-wrapper basis-full">
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Phone *"
                    />
                    {errors.phone?.message && (
                      <p className="text-red-400">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="element-wrapper basis-full">
                    <input
                      type="text"
                      id="country"
                      {...register("country")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Country *"
                    />
                    {errors.country?.message && (
                      <p className="text-red-400">{errors.country.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <div className="element-wrapper basis-full">
                    <input
                      type="text"
                      id="traffic"
                      {...register("traffic")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Traffic Type"
                    />
                    {errors.traffic?.message && (
                      <p className="text-red-400">{errors.traffic.message}</p>
                    )}
                  </div>
                  <div className="element-wrapper basis-full">
                    <input
                      type="text"
                      id="platform"
                      {...register("platform")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Website Platform"
                    />
                    {errors.platform?.message && (
                      <p className="text-red-400">{errors.platform.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="customer-form">
                <div className="mb-3">
                  <div className="element-wrapper basis-full">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Name/ User ID *"
                    />
                    {errors.name?.message && (
                      <p className="text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="element-wrapper basis-full">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="form-control w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Email *"
                    />
                    {errors.email?.message && (
                      <p className="text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="element-wrapper basis-full">
            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className="form-control mb-2 w-full rounded-xl p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Message *"
            ></textarea>
            {errors.message?.message && (
              <p className="text-red-400">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="poppins-bold form-submit w-full rounded-xl bg-teal-500 py-2 text-xl font-bold text-white"
          >
            Submit
          </button>
        </form>
        <div className="my-6 text-center">
          <a
            href="/affiliates"
            className="text-muted trigger-button p-4 text-2xl"
            onClick={toggleForm}
          >
            <span className="affiliate-span">Affilates</span>
            <span className="customer-span">General</span>
            <Image
              alt="arrow_"
              className="form-arrow inline"
              width={25}
              height={25}
              src="img/misc/arrow.svg"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
