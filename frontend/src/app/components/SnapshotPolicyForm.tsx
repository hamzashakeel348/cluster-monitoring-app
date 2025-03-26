import React, { useEffect, useState } from "react";

import { daysArray } from "@/constants/days";
import { SnapshotPolicyFormProps } from "@/types";
import toast from "react-hot-toast";

const SnapshotPolicyForm: React.FC<SnapshotPolicyFormProps> = ({
  policy,
  setPolicy,
  onSubmit,
  loading,
}) => {
  const [readOnly, setReadOnly] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox" || type === "radio") {
      setPolicy({ ...policy, [name]: checked });
    } else {
      setPolicy({ ...policy, [name]: value });
    }
  };

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPolicy({
      ...policy,
      schedule: {
        ...policy.schedule,
        [name]: value,
      },
    });
  };

  const handleDeletePolicyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPolicy({
      ...policy,
      deletePolicy: {
        ...policy.deletePolicy,
        [name]: value,
      },
    });
  };

  const handleDayChange = (day: string) => {
    let updatedDays = [...policy.schedule.days];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter((d) => d !== day);
    } else {
      updatedDays.push(day);
    }
    setPolicy({
      ...policy,
      schedule: {
        ...policy.schedule,
        days: updatedDays,
      },
    });
  };

  const handleEveryDayChange = () => {
    if (policy.schedule.days.length === 7) {
      setPolicy({
        ...policy,
        schedule: {
          ...policy.schedule,
          days: [],
        },
      });
    } else {
      setPolicy({
        ...policy,
        schedule: {
          ...policy.schedule,
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (policy.schedule.days.length === 0) {
      toast.error("At least one day should be selected.");
      return;
    }
    onSubmit(policy);
  };
  useEffect(() => {
    setReadOnly(policy?.snapshotLocking);
  }, [policy?.snapshotLocking]);

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:p-6 text-gray-300 lg:text-xl text-sm"
    >
      <div className="h-[70vh] overflow-auto">
        <div className="mb-4 flex flex-col ">
          <label>Policy Name</label>
          <input
            type="text"
            name="policyName"
            value={policy.policyName}
            onChange={handleChange}
            className="lg:w-3/4 w-full p-2 mt-1 bg-[#1b2129] border border-gray-600 rounded-md focus-visible:outline-0"
            required
            readOnly={readOnly}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label>Apply to Directory</label>
          <div className="flex mt-1 lg:w-3/4">
            <span className="px-4 inline-flex items-center rounded-s-lg border border-gray-600">
              /
            </span>
            <input
              type="text"
              name="directoryPath"
              value={policy.directoryPath}
              onChange={handleChange}
              className="w-full p-2 bg-[#1b2129] border border-gray-600 rounded-md rounded-s-none focus-visible:outline-0"
              required
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="mb-4">
          <label>Run Policy on the Following Schedule</label>
        </div>

        <div className="mb-8 bg-[#1b2129] border border-gray-600 border-t-sm border-x-0 border-b-0 lg:p-8 p-3">
          <div className="mb-4 flex lg:flex-row flex-col items-center">
            <div className="lg:w-1/4 text-right lg:pe-8 p-0">
              <label>Select Schedule Type</label>
            </div>
            <select
              name="type"
              value={policy.schedule.type}
              onChange={handleScheduleChange}
              className="w-full p-2 mt-1 bg-[#1b2129] border border-gray-600 lg:w-1/4 rounded-md"
              disabled={readOnly}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="mb-4 flex flex-row items-center">
            <div className="lg:w-1/4 w-screen text-right lg:pe-8 p-0">
              <label>Set to Time Zone</label>
            </div>
            <p className="w-full p-2 mt-1 lg:w-1/4">America/Los Angeles</p>
          </div>

          <div className="mb-6 flex lg:flex-row flex-col items-center">
            <div className="lg:w-1/4 text-right lg:pe-8 p-0">
              <label>Take a Snapshot at</label>
            </div>
            <input
              type="time"
              name="snapshotTime"
              value={policy.schedule.snapshotTime}
              onChange={handleScheduleChange}
              className="w-full p-2 mt-1 bg-[#1b2129] border border-gray-600 lg:w-1/4 rounded-md focus-visible:outline-0"
              readOnly={readOnly}
            />
          </div>

          <div className="mb-8 flex lg:flex-row flex-col lg:items-center">
            <div className="lg:w-1/4 lg:text-right lg:pe-8 p-0 text-center">
              <label>On the Following Day(s)</label>
            </div>
            <div className="flex items-center lg:me-8">
              <input
                type="checkbox"
                checked={policy.schedule.days.length === 7}
                onChange={handleEveryDayChange}
                className="w-5 h-5 text-sky-500 bg-[#1b2129] border-gray-300 rounded focus-visible:outline-0"
                disabled={readOnly}
              />
              <label className="ms-2">Every day</label>
            </div>

            {daysArray.map((day) => (
              <div key={day} className="flex items-center lg:me-8">
                <input
                  type="checkbox"
                  name={day}
                  checked={policy.schedule.days.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="w-5 h-5 text-sky-500 bg-gray-100 border-gray-300 rounded focus-visible:outline-0"
                  disabled={policy.schedule.days.length === 7 || readOnly}
                />
                <label className="ms-2">{day}</label>
              </div>
            ))}
          </div>

          <div className="mb-4 flex lg:flex-row flex-col lg:items-center">
            <div className="lg:w-1/4 lg:text-right lg:pe-8 p-0 text-center">
              <label>Delete Each Snapshot</label>
            </div>
            <div className="flex lg:items-center lg:me-8">
              <input
                type="radio"
                name="type"
                value="never"
                checked={policy.deletePolicy.type === "never"}
                onChange={handleDeletePolicyChange}
                className="w-5 h-5 text-sky-500 focus-visible:outline-0"
                disabled={readOnly}
              />
              <label className="ms-2">Never</label>
            </div>

            <div className="flex lg:items-center">
              <input
                type="radio"
                name="type"
                value="automatically"
                checked={policy.deletePolicy.type === "automatically"}
                onChange={handleDeletePolicyChange}
                className="w-5 h-5 text-sky-500"
                disabled={readOnly}
              />
              <label className="ms-2">Automatically after</label>
              <input
                type="number"
                name="after"
                value={policy.deletePolicy.after}
                onChange={handleDeletePolicyChange}
                className="lg:w-16 w-8 lg:mx-4 mx-2 p-1 px-3 bg-[#1b2129] border border-gray-600 rounded-md focus-visible:outline-0"
                disabled={policy.deletePolicy.type === "never"}
                readOnly={readOnly}
              />
              <select
                name="cadence"
                value={policy.deletePolicy.cadence}
                onChange={handleDeletePolicyChange}
                className="lg:p-1 bg-[#1b2129] px-3 border border-gray-600 rounded-md lg:w-auto w-16 focus-visible:outline-0"
                disabled={policy.deletePolicy.type === "never" || readOnly}
              >
                <option value="days">day(s)</option>
                <option value="months">month(s)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label>Snapshot Locking</label>
          <p className="text-gray-400 lg:text-lg">
            Locked snapshots cannot be deleted before the deletion schedule
            expires. For this feature to be available, snapshots must be set to
            automatically delete.
          </p>
        </div>

        <div className="mb-16 flex items-center">
          <input
            type="checkbox"
            name="snapshotLocking"
            checked={policy.snapshotLocking}
            onChange={handleChange}
            className="w-5 h-5 text-sky-500 bg-gray-100 border-gray-300 rounded"
            disabled={policy.deletePolicy.type === "never"}
          />
          <label className="ms-2">Enable Locked Snapshots</label>
        </div>

        <div className="mb-8 flex items-center me-8">
          <input
            type="checkbox"
            name="enablePolicy"
            checked={policy.enablePolicy}
            onChange={handleChange}
            className="w-5 h-5 text-sky-500 rounded"
          />
          <label className="ms-2">Enable Policy</label>
        </div>
      </div>
      <div className="flex items-center mt-10">
        <button
          type="submit"
          className="px-4 py-2 bg-sky-600 rounded "
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Policy"}
        </button>
        <a href="/" className="text-[#0Ea5e977] block py-2 px-4 rounded">
          Cancel
        </a>
      </div>
    </form>
  );
};

export default SnapshotPolicyForm;
