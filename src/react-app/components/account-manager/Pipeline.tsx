import { useEffect, useMemo, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { fetchWithAuth } from "@/react-app/utils/api";

interface Role {
  id: number;
  role_code: string;
  title: string;
  status: string;
  total_submissions: number;
}

interface RoleSubmission {
  association_id: number;
  candidate_id: number;
  candidate_name: string;
  candidate_email?: string;
  candidate_phone?: string;
  submission_date: string;
  is_discarded: number;
  discarded_at?: string;
  discarded_reason?: string;
  recruiter_name: string;
  recruiter_code: string;
  submission_id?: number;
  score?: number;
  rm_validation_status?: string;
  rm_rate_bill?: number;
  rm_rate_pay?: number;
  rm_location?: string;
  rm_work_type?: string;
  am_notes?: string;
  am_reviewed_at?: string;
  association_status?: string;
}

interface PipelineProps {
  clientId: number;
  teamId: number;
}

export default function Pipeline({ clientId, teamId }: PipelineProps) {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [dataByRole, setDataByRole] = useState<Record<number, { under_consideration: RoleSubmission[]; rejected: RoleSubmission[] }>>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          status: selectedStatus,
          client_id: String(clientId),
          team_id: String(teamId),
        });
        const res = await fetchWithAuth(`/api/am/roles?${params}`);
        if (!res.ok) return;
        const rolesData: Role[] = await res.json();
        setRoles(rolesData);

        const results = await Promise.all(
          (rolesData || []).map(async (role) => {
            const r = await fetchWithAuth(`/api/am/role-submissions/${role.id}`);
            if (!r.ok) return { roleId: role.id, under_consideration: [], rejected: [] };
            const payload = await r.json();
            return { roleId: role.id, under_consideration: payload.under_consideration || [], rejected: payload.rejected || [] };
          })
        );

        const map: Record<number, { under_consideration: RoleSubmission[]; rejected: RoleSubmission[] }> = {};
        for (const item of results) {
          map[item.roleId] = { under_consideration: item.under_consideration, rejected: item.rejected };
        }
        setDataByRole(map);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [clientId, teamId, selectedStatus]);

  const totals = useMemo(() => {
    let submittedToClient = 0;
    let discarded = 0;
    for (const roleId of Object.keys(dataByRole)) {
      submittedToClient += dataByRole[Number(roleId)].under_consideration.length;
      discarded += dataByRole[Number(roleId)].rejected.length;
    }
    return { submittedToClient, discarded };
  }, [dataByRole]);

  const discardCandidate = async (roleId: number, candidateId: number) => {
    const res = await fetchWithAuth(`/api/am/roles/${roleId}/candidates/${candidateId}/discard`, {
      method: "POST",
      body: JSON.stringify({ reason: "Discarded via Pipe" }),
    });
    if (res.ok) {
      const r = await fetchWithAuth(`/api/am/role-submissions/${roleId}`);
      if (r.ok) {
        const payload = await r.json();
        setDataByRole((prev) => ({ ...prev, [roleId]: { under_consideration: payload.under_consideration || [], rejected: payload.rejected || [] } }));
      }
    }
  };

  const submitToClient = async (roleId: number, candidateId: number) => {
    const res = await fetchWithAuth(`/api/am/roles/${roleId}/candidates/${candidateId}/submit-to-client`, {
      method: "POST",
    });
    if (res.ok) {
      const r = await fetchWithAuth(`/api/am/role-submissions/${roleId}`);
      if (r.ok) {
        const payload = await r.json();
        setDataByRole((prev) => ({ ...prev, [roleId]: { under_consideration: payload.under_consideration || [], rejected: payload.rejected || [] } }));
      }
    }
  };

  const clientReject = async (roleId: number, candidateId: number) => {
    const res = await fetchWithAuth(`/api/am/roles/${roleId}/candidates/${candidateId}/client-reject`, {
      method: "POST",
    });
    if (res.ok) {
      const r = await fetchWithAuth(`/api/am/role-submissions/${roleId}`);
      if (r.ok) {
        const payload = await r.json();
        setDataByRole((prev) => ({ ...prev, [roleId]: { under_consideration: payload.under_consideration || [], rejected: payload.rejected || [] } }));
      }
    }
  };

  const markDeal = async (roleId: number, candidateId: number) => {
    const res = await fetchWithAuth(`/api/am/roles/${roleId}/candidates/${candidateId}/deal`, {
      method: "POST",
    });
    if (res.ok) {
      const r = await fetchWithAuth(`/api/am/role-submissions/${roleId}`);
      if (r.ok) {
        const payload = await r.json();
        setDataByRole((prev) => ({ ...prev, [roleId]: { under_consideration: payload.under_consideration || [], rejected: payload.rejected || [] } }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Pipe</h2>
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="active">Active Roles</option>
            <option value="deal">Deal Roles</option>
            <option value="lost">Lost Roles</option>
            <option value="cancelled">Cancelled Roles</option>
            <option value="on_hold">On Hold Roles</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-sm text-green-700 font-semibold">Submitted to Client</p>
            <p className="text-2xl font-bold text-green-700">{totals.submittedToClient}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-600" />
          <div>
            <p className="text-sm text-red-700 font-semibold">Discarded</p>
            <p className="text-2xl font-bold text-red-700">{totals.discarded}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : roles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No active roles found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {roles.map((role) => {
            const bucket = dataByRole[role.id] || { under_consideration: [], rejected: [] };
            return (
              <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                    <p className="text-xs text-gray-600 font-mono">{role.role_code}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-1">
                      In Pipe: {bucket.under_consideration.length}
                    </span>
                    <span className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-1">
                      Discarded: {bucket.rejected.length}
                    </span>
                  </div>
                </div>

                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Candidate</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Location</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Rates</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Score (0–5)</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Contract Type</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Date Submitted</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">RM Status</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Current Status</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...bucket.under_consideration.map((r) => ({ ...r })), ...bucket.rejected.map((r) => ({ ...r }))].map(
                        (row, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-3">
                              <div className="font-medium text-gray-900">{row.candidate_name || "Unknown"}</div>
                              <div className="text-xs text-gray-500">
                                {row.recruiter_name} · {row.recruiter_code}
                              </div>
                            </td>
                            <td className="py-2 px-3 text-sm text-gray-700">{row.rm_location || "-"}</td>
                            <td className="py-2 px-3 text-sm text-gray-700">
                              {row.rm_rate_bill ? `Bill: ${row.rm_rate_bill}` : "-"}
                              {row.rm_rate_pay ? ` · Pay: ${row.rm_rate_pay}` : ""}
                            </td>
                            <td className="py-2 px-3 text-sm text-gray-700">{row.score != null ? Number(row.score).toFixed(2) : "-"}</td>
                            <td className="py-2 px-3 text-sm text-gray-700">{row.rm_work_type || "-"}</td>
                            <td className="py-2 px-3 text-sm text-gray-700">{row.submission_date?.slice(0, 10) || "-"}</td>
                            <td className="py-2 px-3 text-sm text-gray-700">{row.rm_validation_status || "-"}</td>
                            <td className="py-2 px-3 text-sm relative">
                              <button
                                className={`px-2 py-1 rounded text-xs border ${
                                  row.is_discarded === 1
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : row.association_status === "client_submitted"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : row.association_status === "client_rejected"
                                    ? "bg-gray-50 text-gray-700 border-gray-200"
                                    : row.association_status === "deal"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                                onClick={() => setOpenMenuFor(`${role.id}:${row.candidate_id}`)}
                              >
                                {row.is_discarded === 1
                                  ? "Discarded"
                                  : row.association_status === "client_submitted"
                                  ? "Under Client Evaluation"
                                  : row.association_status === "client_rejected"
                                  ? "Submitted to Client"
                                  : row.association_status === "deal"
                                  ? "Deal"
                                  : "Submitted"}
                              </button>
                              {openMenuFor === `${role.id}:${row.candidate_id}` && (
                                <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 w-48">
                                  <button
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                                    onClick={() => {
                                      setOpenMenuFor(null);
                                      submitToClient(role.id, row.candidate_id!);
                                    }}
                                  >
                                    Under Client Evaluation
                                  </button>
                                  <button
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                                    onClick={() => {
                                      setOpenMenuFor(null);
                                      clientReject(role.id, row.candidate_id!);
                                    }}
                                  >
                                    Submitted to Client (Rejected)
                                  </button>
                                  <button
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                                    onClick={() => {
                                      setOpenMenuFor(null);
                                      markDeal(role.id, row.candidate_id!);
                                    }}
                                  >
                                    Deal
                                  </button>
                                  <button
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded text-red-600"
                                    onClick={() => {
                                      setOpenMenuFor(null);
                                      discardCandidate(role.id, row.candidate_id!);
                                    }}
                                  >
                                    Discard
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="py-2 px-3 text-right">
                              {row.is_discarded !== 1 ? (
                                <button
                                  className="text-xs px-3 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50"
                                  onClick={() => discardCandidate(role.id, row.candidate_id!)}
                                >
                                  Discard
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400">—</span>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
