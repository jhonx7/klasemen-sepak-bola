import Guest from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Skor({ klubs, skors }) {
    const [isMulti, setIsMulti] = useState(false);
    const { data, setData, post, errors, clearErrors, processing, reset } =
        useForm({
            klub1: [
                {
                    id: "",
                    skor: 0,
                },
            ],
            klub2: [
                {
                    id: "",
                    skor: 0,
                },
            ],
        });

    const tambahData = () => {
        setData({
            klub1: [
                ...data.klub1,
                {
                    id: "",
                    skor: 0,
                },
            ],
            klub2: [
                ...data.klub2,
                {
                    id: "",
                    skor: 0,
                },
            ],
        });
    };

    const handleChange = (index, label, posisi, value) => {
        setData((prevState) => {
            prevState[posisi][index][label] = value;
            return {
                ...prevState,
            };
        });
    };
    const simpanData = (e) => {
        e.preventDefault();
        try {
            post(route("skor.tambah"), {
                onSuccess: () => {
                    reset();
                    clearErrors();
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const TABLE_HEAD = ["Klub 1", "Klub 2", "Skor 1", "Skor 2"];

    return (
        <Guest>
            <Head title="Skor" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="m-3">
                            <label
                                className="inline-block pl-[0.15rem] hover:cursor-pointer mr-2"
                                htmlFor="flexSwitchCheckDefault"
                            >
                                Multiple Input
                            </label>
                            <input
                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                value={isMulti}
                                onChange={(e) => setIsMulti(e.target.checked)}
                            />
                        </div>
                        <form className="m-5" onSubmit={simpanData}>
                            {data?.klub1?.length > 0 &&
                                data?.klub1?.map((_, index) => (
                                    <div
                                        key={index}
                                        className="mt-10 grid gap-x-5 gap-y-5 sm:grid-cols-12 w-full"
                                    >
                                        <div
                                            className={
                                                isMulti
                                                    ? "sm:col-span-3"
                                                    : "sm:col-span-6"
                                            }
                                        >
                                            <label
                                                htmlFor={"nama-klub1-" + index}
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Klub 1
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id={"nama-klub1-" + index}
                                                    name={"nama-klub1-" + index}
                                                    value={
                                                        data?.klub1[index].id
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "id",
                                                            "klub1",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">
                                                        Pilih Klub
                                                    </option>
                                                    {klubs?.length > 0 &&
                                                        klubs?.map((klub) => (
                                                            <option
                                                                key={klub.id}
                                                                value={klub.id}
                                                            >
                                                                {klub.nama}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            {errors[`klub1.${index}.id`] && (
                                                <div className=" text-red-400">
                                                    {
                                                        errors[
                                                            `klub1.${index}.id`
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                isMulti
                                                    ? "sm:col-span-3"
                                                    : "sm:col-span-6"
                                            }
                                        >
                                            <label
                                                htmlFor={"nama-klub2-" + index}
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Klub 2
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id={"nama-klub2-" + index}
                                                    name={"nama-klub2-" + index}
                                                    value={
                                                        data?.klub2[index].id
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "id",
                                                            "klub2",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">
                                                        Pilih Klub
                                                    </option>
                                                    {klubs?.length > 0 &&
                                                        klubs?.map((klub) => (
                                                            <option
                                                                key={klub.id}
                                                                value={klub.id}
                                                            >
                                                                {klub.nama}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            {errors[`klub2.${index}.id`] && (
                                                <div className=" text-red-400">
                                                    {
                                                        errors[
                                                            `klub2.${index}.id`
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className={
                                                isMulti
                                                    ? "sm:col-span-3"
                                                    : "sm:col-span-6"
                                            }
                                        >
                                            <label
                                                htmlFor={"skor-klub1-" + index}
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Skor 1
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id={"skor-klub1-" + index}
                                                    name={"skor-klub1-" + index}
                                                    type="number"
                                                    value={
                                                        data?.klub1[index].skor
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "skor",
                                                            "klub1",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors[`klub1.${index}.skor`] && (
                                                <div className=" text-red-400">
                                                    {
                                                        errors[
                                                            `klub1.${index}.skor`
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                isMulti
                                                    ? "sm:col-span-3"
                                                    : "sm:col-span-6"
                                            }
                                        >
                                            <label
                                                htmlFor={"skor-klub2-" + index}
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Skor 2
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id={"skor-klub2-" + index}
                                                    name={"skor-klub2-" + index}
                                                    type="number"
                                                    value={
                                                        data?.klub2[index].skor
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "skor",
                                                            "klub2",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors[`klub2.${index}.skor`] && (
                                                <div className=" text-red-400">
                                                    {
                                                        errors[
                                                            `klub2.${index}.skor`
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            <div className="mt-10 grid gap-x-5 gap-y-5 sm:grid-cols-6 w-full">
                                {isMulti && (
                                    <div className="sm:col-span-12 flex items-center justify-end">
                                        <button
                                            onClick={tambahData}
                                            disabled={processing}
                                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                )}
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
                            <h1 className="text-2xl">Daftar Skor</h1>
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
                                {skors?.length > 0 &&
                                    skors?.map((value, index) => {
                                        const isLast =
                                            index === skors.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={value.id}>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {value?.klub_satu?.nama}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {value?.klub_dua?.nama}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {value?.skor_satu}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {value?.skor_dua}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {skors?.length === 0 && (
                            <div className="text-center m-3">Data Kosong</div>
                        )}
                    </div>
                </div>
            </div>
        </Guest>
    );
}
