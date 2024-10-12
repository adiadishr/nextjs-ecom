import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {

    function checkIfRouteExists(slug: string) {
        const validRoutes = ['/', '/products'];
        return validRoutes.includes(slug);
    }
    const isValidRoute = checkIfRouteExists(params.slug);

    if (!isValidRoute) {
        notFound();
    }

}

