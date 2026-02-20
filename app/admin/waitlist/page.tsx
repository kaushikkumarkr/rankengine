import { supabase } from "@/lib/supabase";
import { WaitlistEntry } from "@/types/waitlist";

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage() {
    const { data: waitlist, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("position", { ascending: true });

    if (error) {
        return (
            <div className="p-8 bg-slate-50 min-h-screen">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error fetching waitlist</h1>
                <pre className="bg-white border border-red-200 text-slate-800 p-4 rounded-md shadow-sm">
                    {error.message}
                </pre>
            </div>
        );
    }

    const entries: WaitlistEntry[] = waitlist || [];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Waitlist Users ({entries.length})</h1>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-100 text-slate-600">
                                <tr>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Pos</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Date</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Name</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Email</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Company</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Size</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Spend</th>
                                    <th className="px-6 py-4 font-semibold border-b border-slate-200">Frustration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {entries.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                                            No waitlist entries found.
                                        </td>
                                    </tr>
                                ) : (
                                    entries.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-blue-600 font-medium">#{entry.position}</td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{entry.full_name}</td>
                                            <td className="px-6 py-4 text-slate-600">{entry.email}</td>
                                            <td className="px-6 py-4 text-slate-700">{entry.company_name}</td>
                                            <td className="px-6 py-4 text-slate-600">{entry.company_size}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                                                    {entry.seo_spend}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={entry.frustration || ''}>
                                                {entry.frustration || '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
