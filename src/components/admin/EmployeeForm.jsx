import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function EmployeeForm({
  isOpen,
  onClose,
  onSubmit,
  employee,
  departments,
  jobSites,
  isLoading
}) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    employee_id: '',
    role: 'employee',
    department_id: '',
    job_site_id: '',
    hourly_rate: '',
    shift_start: '09:00',
    shift_end: '17:00',
    status: 'active'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name || '',
        phone_number: employee.phone_number || '',
        email: employee.email || '',
        employee_id: employee.employee_id || '',
        role: employee.role || 'employee',
        department_id: employee.department_id || '',
        job_site_id: employee.job_site_id || '',
        hourly_rate: employee.hourly_rate || '',
        shift_start: employee.shift_start || '09:00',
        shift_end: employee.shift_end || '17:00',
        status: employee.status || 'active'
      });
    } else {
      setFormData({
        full_name: '',
        phone_number: '',
        email: '',
        employee_id: '',
        role: 'employee',
        department_id: '',
        job_site_id: '',
        hourly_rate: '',
        shift_start: '09:00',
        shift_end: '17:00',
        status: 'active'
      });
    }
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-3xl p-8 w-full max-w-lg shadow-2xl overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Full Name */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium text-sm">Full Name *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium text-sm">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-sm">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block mb-1 font-medium text-sm">Employee ID</label>
              <input
                type="text"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                placeholder="EMP-001"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium text-sm">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              >
                <option value="employee">Employee</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-1 font-medium text-sm">Department</label>
              <select
                value={formData.department_id}
                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              >
                <option value="">None</option>
                {departments?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            {/* Job Site */}
            <div>
              <label className="block mb-1 font-medium text-sm">Job Site</label>
              <select
                value={formData.job_site_id}
                onChange={(e) => setFormData({ ...formData, job_site_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              >
                <option value="">None</option>
                {jobSites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block mb-1 font-medium text-sm">Hourly Rate ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.hourly_rate}
                onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                placeholder="15.00"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Shift Start */}
            <div>
              <label className="block mb-1 font-medium text-sm">Shift Start</label>
              <input
                type="time"
                value={formData.shift_start}
                onChange={(e) => setFormData({ ...formData, shift_start: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Shift End */}
            <div>
              <label className="block mb-1 font-medium text-sm">Shift End</label>
              <input
                type="time"
                value={formData.shift_end}
                onChange={(e) => setFormData({ ...formData, shift_end: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
              />
            </div>

            {/* Status (edit only) */}
            {employee && (
              <div>
                <label className="block mb-1 font-medium text-sm">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {employee ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
