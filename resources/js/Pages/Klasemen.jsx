import Guest from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Klasemen({ data }) {
    const TABLE_HEAD = ["No", "Klub", "Ma", "Me", "S", "K", "GM", "GK", "Poin"];

    return (
        <Guest>
            <Head title="Klasemen" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center font-bold m-3">
                            <h1 className="text-2xl">Klasemen</h1>
                        </div>
                        <table className="w-full min-w-max table-auto text-center border">
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
                                {data?.length > 0 &&
                                    data?.map(
                                        (
                                            {
                                                id,
                                                nama,
                                                main,
                                                menang,
                                                kalah,
                                                seri,
                                                goal_menang,
                                                goal_kalah,
                                                poin,
                                            },
                                            index
                                        ) => {
                                            const isLast =
                                                index === data.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={id}>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {nama}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {main}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {menang}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {kalah}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {seri}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {goal_menang}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {goal_kalah}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="font-normal">
                                                            {poin}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                        {data?.length === 0 && (
                            <div className="text-center m-3">Data Kosong</div>
                        )}
                    </div>
                </div>
            </div>
        </Guest>
    );
}
