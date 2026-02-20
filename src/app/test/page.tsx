"use client";

import { useState } from "react";
import { Button, IconButton } from "@/components/atoms/Buttons";
import { Badge } from "@/components/atoms/Badge";
import { Spinner } from "@/components/atoms/Spinner";
import { FiPlus } from "react-icons/fi";
import { TestingBoard } from "./components/TestingBoard";
import { Container } from "@/components/layout/Container";
import { Flex } from "@/components/layout/Flex";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Divider } from "@/components/atoms/Divider";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Alert } from "@/components/molecules/Alert";

export default function TestIndexPage() {
  const [loadingDemo, setLoadingDemo] = useState(false);

  function triggerLoadingDemo() {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl space-y-2">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">Test Dome</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            ipsa illo illum reiciendis in sapiente, aspernatur fuga, ab
            asperiores corporis pariatur repudiandae suscipit veniam
            voluptatibus consectetur ipsum, officiis accusamus assumenda?
          </p>
        </header>

        {/* Testing dome stuff where to drop buttom components */}
        <h2 className="text-lg font-medium text-zinc-900">Buttons</h2>
        <TestingBoard>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button
            variant="primary"
            loading={loadingDemo}
            onClick={triggerLoadingDemo}
          >
            Enviar
          </Button>
          <Button variant="primary" disabled>
            Desactivado
          </Button>
        </TestingBoard>
        <h3 className="text-lg font-medium text-zinc-900">Vertical example</h3>
        <TestingBoard direction="vertical">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </TestingBoard>

        {/* tarjeta con todos los botones */}
        <h2 className="text-lg font-medium text-zinc-900">
          Variants y estados
        </h2>
        <TestingBoard>
          <Badge status="default">Default</Badge>
          <Badge status="info">Info</Badge>
          <Badge status="success">Success</Badge>
          <Badge status="warning">Warning</Badge>
          <Badge status="danger">Danger</Badge>
        </TestingBoard>

        {/* icon buttons section */}
        <h3 className="text-lg font-medium text-zinc-900">Icon buttons</h3>
        <TestingBoard>
          <IconButton
            aria-label="Agregar"
            variant="success"
            icon={<FiPlus />}
          />
        </TestingBoard>

        {/* spinners section - all sizes and fun variations */}
        <h3 className="text-lg font-medium text-zinc-900">Spinners</h3>
        <TestingBoard>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
          {/* color overrides */}
          <Spinner size="lg" className="text-red-500" />
          <Spinner size="lg" className="text-green-500" />
          {/* animation speed variants using duration utility */}
          <Spinner size="lg" className="animate-spin duration-1000" />
          <Spinner size="lg" className="animate-spin duration-200" />
        </TestingBoard>

        {/* circular button examples */}
        <h3 className="text-lg font-medium text-zinc-900">Circular buttons</h3>
        <TestingBoard>
          <Button variant="circle" size="xs">
            A
          </Button>
          <Button variant="circle" size="sm">
            B
          </Button>
          <Button variant="circle" size="md">
            C
          </Button>
          <Button variant="circle" size="lg">
            D
          </Button>
          <Button variant="circle" size="xl">
            E
          </Button>
          {/* icon-style labels */}
          <Button variant="circle" size="md">
            ⚙️
          </Button>
          <Button variant="circle" size="md" loading>
            <span className="sr-only">loading</span>
          </Button>
        </TestingBoard>

        {/* creative combos */}
        <h3 className="text-lg font-medium text-zinc-900">Combos creativos</h3>
        <TestingBoard>
          <Button variant="primary" size="lg" loading>
            Guardar
          </Button>
          <Button variant="danger" size="sm" disabled>
            Eliminar
          </Button>
          <Button
            variant="outline"
            size="md"
            className="bg-linear-to-r from-purple-400 to-pink-500 text-white"
          >
            Gradiente
          </Button>
          <Button variant="ghost" size="xl">
            Fantasma XL
          </Button>
          <Button
            variant="primary"
            loading
            spinner={<Spinner size="sm" className="text-yellow-500" />}
          >
            Custom Spin
          </Button>
        </TestingBoard>

        {/* Layout & Generic Components */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-12 mb-4">Layout & Generics</h2>
        
        <h3 className="text-lg font-medium text-zinc-900">Container</h3>
        <div className="bg-zinc-200 py-4 rounded-md">
          <Container size="sm" className="bg-white p-4 rounded shadow-sm text-center">
            Container (sm)
          </Container>
        </div>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Flex</h3>
        <TestingBoard>
          <Flex gap="4" align="center" justify="between" className="w-full bg-white p-4 rounded shadow-sm">
            <div className="bg-blue-100 p-2 rounded">Item 1</div>
            <div className="bg-blue-100 p-2 rounded">Item 2</div>
            <div className="bg-blue-100 p-2 rounded">Item 3</div>
          </Flex>
        </TestingBoard>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Grid</h3>
        <TestingBoard>
          <Grid cols={3} className="gap-4 w-full">
            <div className="bg-green-100 p-4 rounded text-center">Col 1</div>
            <div className="bg-green-100 p-4 rounded text-center">Col 2</div>
            <div className="bg-green-100 p-4 rounded text-center">Col 3</div>
            <div className="bg-green-100 p-4 rounded text-center">Col 4</div>
            <div className="bg-green-100 p-4 rounded text-center">Col 5</div>
            <div className="bg-green-100 p-4 rounded text-center">Col 6</div>
          </Grid>
        </TestingBoard>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Stack</h3>
        <TestingBoard>
          <Stack space="md" className="w-full bg-white p-4 rounded shadow-sm">
            <div className="bg-purple-100 p-2 rounded">Stacked Item A</div>
            <div className="bg-purple-100 p-2 rounded">Stacked Item B</div>
            <div className="bg-purple-100 p-2 rounded">Stacked Item C</div>
          </Stack>
        </TestingBoard>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Divider</h3>
        <TestingBoard direction="vertical" className="w-full">
          <div className="w-full text-center">Above Divider</div>
          <Divider />
          <div className="w-full text-center">Below Divider</div>
          <Flex className="h-12 items-center justify-center gap-4 w-full mt-4">
            <span>Left</span>
            <Divider orientation="vertical" />
            <span>Right</span>
          </Flex>
        </TestingBoard>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Skeleton</h3>
        <TestingBoard direction="vertical" className="w-full items-start">
          <Flex gap="4" align="center" className="w-full">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Stack space="sm" className="flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Stack>
          </Flex>
        </TestingBoard>

        <h3 className="text-lg font-medium text-zinc-900 mt-6">Alerts</h3>
        <TestingBoard direction="vertical" className="w-full items-stretch">
          <Alert variant="info" title="Information">
            This is an informational alert to guide the user.
          </Alert>
          <Alert variant="success" title="Success!">
            Your action was completed successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please be careful before proceeding with this action.
          </Alert>
          <Alert variant="danger" title="Error">
            Something went wrong. Please try again later.
          </Alert>
        </TestingBoard>
      </div>
    </main>
  );
}
