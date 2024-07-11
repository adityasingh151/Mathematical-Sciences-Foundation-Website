import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { txtdb, imgdb } from "../../databaseConfig/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [fields, setFields] = useState([
    "headerTitle",
    "headerSubtitle",
    "aboutTitle",
    "aboutDescription",
    "aboutImage",
  ]);

  const aboutImage = watch("aboutImage");
  const sponsorImage1 = watch("sponsorImage1");
  const sponsorImage2 = watch("sponsorImage2");

  const [imagePreview, setImagePreview] = useState();
  const [sponsorImage1Preview, setSponsorImage1Preview] = useState();
  const [sponsorImage2Preview, setSponsorImage2Preview] = useState();

  useEffect(() => {
    if (aboutImage && aboutImage.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(aboutImage[0]);
    } else {
      setImagePreview(null);
    }
  }, [aboutImage]);

  useEffect(() => {
    if (sponsorImage1 && sponsorImage1.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setSponsorImage1Preview(e.target.result);
      fileReader.readAsDataURL(sponsorImage1[0]);
    } else {
      setSponsorImage1Preview(null);
    }
  }, [sponsorImage1]);

  useEffect(() => {
    if (sponsorImage2 && sponsorImage2.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setSponsorImage2Preview(e.target.result);
      fileReader.readAsDataURL(sponsorImage2[0]);
    } else {
      setSponsorImage2Preview(null);
    }
  }, [sponsorImage2]);

  const uploadImage = async (imageFile, path) => {
    const storageReference = storageRef(imgdb, path);
    await uploadBytes(storageReference, imageFile);
    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  };

  const onSubmit = async (data) => {
    try {
      const aboutImageURL = await uploadImage(
        data.aboutImage[0],
        `events/${data.aboutImage[0].name}`
      );
      const sponsorImage1URL = await uploadImage(
        data.sponsorImage1[0],
        `sponsors/${data.sponsorImage1[0].name}`
      );
      const sponsorImage2URL = await uploadImage(
        data.sponsorImage2[0],
        `sponsors/${data.sponsorImage2[0].name}`
      );

      const eventData = {
        ...data,
        aboutImage: aboutImageURL,
        sponsorImage1: sponsorImage1URL,
        sponsorImage2: sponsorImage2URL,
      };

      const eventRef = ref(txtdb, "events");
      await push(eventRef, eventData);

      console.log("Event data submitted successfully!", eventData);
    } catch (error) {
      console.log("Error adding event data: ", error);
    }
  };

  const toggleFields = (fieldArray) => {
    const currentFieldSet = new Set(fields);
    const hasAllFields = fieldArray.every((field) =>
      currentFieldSet.has(field)
    );

    if (hasAllFields) {
      setFields(fields.filter((field) => !fieldArray.includes(field)));
    } else {
      setFields([
        ...fields,
        ...fieldArray.filter((field) => !currentFieldSet.has(field)),
      ]);
    }
  };

  useEffect(() => {
    register("aboutImage", { required: "This field is required" });
    register("sponsorImage1", { required: "This field is required" });
    register("sponsorImage2", { required: "This field is required" });
  }, [register]);

  const getInputType = (fieldName) => {
    if (fieldName.includes("Image")) return "file";
    if (fieldName.includes("Date")) return "date";
    if (fieldName.includes("Time")) return "time";
    if (fieldName.includes("Link") || fieldName.includes("URL")) return "url";
    if (fieldName.includes("Fee")) return "number";
    return "text";
  };

  const sectionFields = {
    headerSection: ["headerSubtitle"],
    featuresSection: ["feature1", "feature2", "feature3"],
    sponsorsSection: ["sponsor1", "sponsorImage1", "sponsor2", "sponsorImage2"],
    rewardsSection: [
      "studentReward1",
      "studentReward2",
      "studentReward3",
      "schoolReward1",
      "schoolReward2",
      "schoolReward3",
    ],
    aboutOrganizationSection: ["organizationDescription"],
    advisorySection: [
      "advisoryMember1",
      "advisoryMemberDescription1",
      "advisoryMember2",
      "advisoryMemberDescription2",
      "advisoryMember3",
      "advisoryMemberDescription3",
    ],
    registrationSection: [
      "eligibility",
      "eventDate",
      "eventTime",
      "registrationFee",
      "registrationLink",
    ],
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col space-y-2 p-6 sm:w-1/3">
        {Object.entries(sectionFields).map(([section, fieldArray]) => (
          <button
            key={section}
            onClick={() => toggleFields(fieldArray)}
            className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${
              fields.some((field) => fieldArray.includes(field))
                ? "bg-red-500 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white`}
          >
            <BsPlusCircle />{" "}
            {fields.some((field) => fieldArray.includes(field))
              ? "Remove"
              : "Add"}{" "}
            {section.replace(/([A-Z])/g, " $1").replace("section", " Section")}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3"
      >
        <h2 className="text-2xl font-bold text-indigo-600">Event Details</h2>
        {fields.map((field) => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
              {![
                "headerSubtitle",
                "feature1",
                "feature2",
                "feature3",
                "sponsor1",
                "sponsorImage1",
                "sponsor2",
                "sponsorImage2",
                "studentReward1",
                "studentReward2",
                "studentReward3",
                "schoolReward1",
                "schoolReward2",
                "schoolReward3",
                "organizationDescription",
                "advisoryMember1",
                "advisoryMemberDescription1",
                "advisoryMember2",
                "advisoryMemberDescription2",
                "advisoryMember3",
                "advisoryMemberDescription3",
                "eligibility",
                "eventDate",
                "eventTime",
                "registrationFee",
                "registrationLink",
              ].includes(field) ? (
                <span className="text-red-500">*</span>
              ) : null}
            </label>
            {field === "aboutImage" ||
            field === "sponsorImage1" ||
            field === "sponsorImage2" ? (
              <div>
                <input
                  type="file"
                  {...register(field, {
                    required:
                      ![
                        "headerSubtitle",
                        "feature1",
                        "feature2",
                        "feature3",
                        "sponsor1",
                        "sponsorImage1",
                        "sponsor2",
                        "sponsorImage2",
                        "studentReward1",
                        "studentReward2",
                        "studentReward3",
                        "schoolReward1",
                        "schoolReward2",
                        "schoolReward3",
                        "organizationDescription",
                        "advisoryMember1",
                        "advisoryMemberDescription1",
                        "advisoryMember2",
                        "advisoryMemberDescription2",
                        "advisoryMember3",
                        "advisoryMemberDescription3",
                        "eligibility",
                        "eventDate",
                        "eventTime",
                        "registrationFee",
                        "registrationLink",
                      ].includes(field) && "This field is required",
                  })}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {field === "aboutImage" && imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 h-48 w-auto border rounded-md"
                  />
                )}
                {field === "sponsorImage1" && sponsorImage1Preview && (
                  <img
                    src={sponsorImage1Preview}
                    alt="Preview"
                    className="mt-4 h-48 w-auto border rounded-md"
                  />
                )}
                {field === "sponsorImage2" && sponsorImage2Preview && (
                  <img
                    src={sponsorImage2Preview}
                    alt="Preview"
                    className="mt-4 h-48 w-auto border rounded-md"
                  />
                )}
              </div>
            ) : (
              <input
                type={getInputType(field)}
                {...register(field, {
                  required:
                    ![
                      "headerSubtitle",
                      "feature1",
                      "feature2",
                      "feature3",
                      "sponsor1",
                      "sponsorImage1",
                      "sponsor2",
                      "sponsorImage2",
                      "studentReward1",
                      "studentReward2",
                      "studentReward3",
                      "schoolReward1",
                      "schoolReward2",
                      "schoolReward3",
                      "organizationDescription",
                      "advisoryMember1",
                      "advisoryMemberDescription1",
                      "advisoryMember2",
                      "advisoryMemberDescription2",
                      "advisoryMember3",
                      "advisoryMemberDescription3",
                      "eligibility",
                      "eventDate",
                      "eventTime",
                      "registrationFee",
                      "registrationLink",
                    ].includes(field) && "This field is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3 characters",
                  },
                })}
                className={`mt-1 block w-full pl-3 pr-12 py-2 border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
              />
            )}
            {errors[field] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field].message}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Event Details
        </button>
      </form>
    </div>
  );
};

export default EventForm;
