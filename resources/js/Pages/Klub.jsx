import Guest from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Klub({ klubs }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        nama: "",
        kota: "",
    });
    const TABLE_HEAD = ["Nama Klub", "Asal Kota"];
    const simpanData = (e) => {
        e.preventDefault();
        try {
            post(route("klub.tambah"), {
                onSuccess: () => reset(),
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Guest>
            <Head title="Klub" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form className="m-5" onSubmit={simpanData}>
                            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-6 w-1/3">
                                <div className="sm:col-span-12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Nama Klub
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="nama"
                                            name="nama"
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.nama && (
                                        <div className=" text-red-400">
                                            {errors.nama}
                                        </div>
                                    )}
                                </div>
                                <div className="sm:col-span-12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Kota Klub
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="kota"
                                            name="kota"
                                            type="text"
                                            value={data.kota}
                                            onChange={(e) =>
                                                setData("kota", e.target.value)
                                            }
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.kota && (
                                        <div className=" text-red-400">
                                            {errors.kota}
                                        </div>
                                    )}
                                </div>
                                <div className="sm:col-span-12 flex items-center justify-end">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center font-bold m-3">
                            <h1 className="text-2xl">Daftar Klub</h1>
                        </div>
                        <table className="w-full min-w-max table-auto text-left border">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <div className="font-normal leading-none ">
                                                {head}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {klubs?.length > 0 &&
                                    klubs?.map(({ id, nama, kota }, index) => {
                                        const isLast =
                                            index === klubs.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={id}>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {nama}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {kota}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {klubs?.length === 0 && (
                            <div className="text-center m-3">Data Kosong</div>
                        )}
                    </div>
                </div>
            </div>
        </Guest>
    );
}
