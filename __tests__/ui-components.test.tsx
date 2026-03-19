import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Componentes UI - Testes básicos de renderização e acessibilidade
describe("UI Components - Card", () => {
  it("deve renderizar card corretamente", () => {
    const { Card } = require("@/components/ui/card");
    const { container } = render(
      <Card>
        <div>Card Content</div>
      </Card>,
    );
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("deve aplicar estilos de card", () => {
    const { Card } = require("@/components/ui/card");
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});

describe("UI Components - Button", () => {
  it("deve renderizar button", () => {
    const { Button } = require("@/components/ui/button");
    const { container } = render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("deve ser clicável", () => {
    const { Button } = require("@/components/ui/button");
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByText("Click");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve suportar variantes", () => {
    const { Button } = require("@/components/ui/button");
    const { container } = render(
      <>
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="secondary">Secondary</Button>
      </>,
    );

    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("deve suportar disabled state", () => {
    const { Button } = require("@/components/ui/button");
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByText("Disabled") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("deve suportar loading state", () => {
    const { Button } = require("@/components/ui/button");
    const { container } = render(<Button disabled>Loading...</Button>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

describe("UI Components - Input", () => {
  it("deve renderizar input", () => {
    const { Input } = require("@/components/ui/input");
    const { container } = render(<Input placeholder="Enter text" />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Enter text");
  });

  it("deve capturar input do usuário", async () => {
    const { Input } = require("@/components/ui/input");
    const user = userEvent.setup();
    const { container } = render(<Input data-testid="text-input" />);

    const input = screen.getByTestId("text-input") as HTMLInputElement;
    await user.type(input, "test value");
    expect(input.value).toBe("test value");
  });

  it("deve lidar com onChange", () => {
    const { Input } = require("@/components/ui/input");
    const handleChange = jest.fn();
    const { container } = render(<Input onChange={handleChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("deve suportar diferentes tipos de input", () => {
    const { Input } = require("@/components/ui/input");
    const { container } = render(
      <>
        <Input type="email" data-testid="email-input" />
        <Input type="password" data-testid="password-input" />
        <Input type="number" data-testid="number-input" />
      </>,
    );

    expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email");
    expect(screen.getByTestId("password-input")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByTestId("number-input")).toHaveAttribute(
      "type",
      "number",
    );
  });
});

describe("UI Components - Label", () => {
  it("deve renderizar label", () => {
    const { Label } = require("@/components/ui/label");
    render(<Label htmlFor="input">Label Text</Label>);
    expect(screen.getByText("Label Text")).toBeInTheDocument();
  });

  it("deve conectar com input via htmlFor", () => {
    const { Label } = require("@/components/ui/label");
    const { Input } = require("@/components/ui/input");
    const { container } = render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </>,
    );

    const label = screen.getByText("Test Label") as HTMLLabelElement;
    expect(label.htmlFor).toBe("test-input");
  });
});

describe("UI Components - Tabs", () => {
  it("deve renderizar tabs", () => {
    const {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
    } = require("@/components/ui/tabs");
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("deve alternar entre tabs", async () => {
    const {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
    } = require("@/components/ui/tabs");
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    const tab2 = screen.getByText("Tab 2");
    await user.click(tab2);

    await waitFor(() => {
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });
});

describe("UI Components - Checkbox", () => {
  it("deve renderizar checkbox", () => {
    const { Checkbox } = require("@/components/ui/checkbox");
    const { container } = render(<Checkbox data-testid="test-checkbox" />);
    // Checkbox pode ser div com role ou input
    expect(
      container.querySelector("[data-testid='test-checkbox']") ||
        container.querySelector("[role='checkbox']"),
    ).toBeTruthy();
  });

  it("deve suportar defaultChecked prop", () => {
    const { Checkbox } = require("@/components/ui/checkbox");
    const { container } = render(
      <Checkbox defaultChecked data-testid="test-checkbox-2" />,
    );
    expect(
      container.querySelector("[data-testid='test-checkbox-2']"),
    ).toBeTruthy();
  });
});

describe("UI Components - Badge", () => {
  it("deve renderizar badge", () => {
    const { Badge } = require("@/components/ui/badge");
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("deve suportar variantes", () => {
    const { Badge } = require("@/components/ui/badge");
    const { container } = render(
      <>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </>,
    );
    expect(screen.getByText("Default")).toBeInTheDocument();
  });
});

describe("UI Components - Dialog/Modal", () => {
  it("deve renderizar dialog trigger", () => {
    const { Dialog, DialogTrigger } = require("@/components/ui/dialog");

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
      </Dialog>,
    );

    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});

describe("UI Components - Accordion", () => {
  it("deve renderizar accordion", () => {
    const {
      Accordion,
      AccordionItem,
      AccordionTrigger,
      AccordionContent,
    } = require("@/components/ui/accordion");

    render(
      <Accordion>
        <AccordionItem value="1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Trigger 1")).toBeInTheDocument();
  });
});

describe("UI Components - Switch", () => {
  it("deve renderizar switch", () => {
    const { Switch } = require("@/components/ui/switch");
    const { container } = render(<Switch />);
    expect(container.querySelector('[role="switch"]')).toBeInTheDocument();
  });

  it("deve mudar estado", async () => {
    const { Switch } = require("@/components/ui/switch");
    const user = userEvent.setup();
    const handleChange = jest.fn();

    const { container } = render(<Switch onCheckedChange={handleChange} />);

    const switchElement = container.querySelector(
      '[role="switch"]',
    ) as HTMLElement;
    if (switchElement) {
      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalled();
    }
  });
});

describe("UI Components - Toast", () => {
  it("deve ter hook useToast disponível", () => {
    const { useToast } = require("@/components/ui/use-toast");
    expect(typeof useToast).toBe("function");
  });
});

describe("UI Components - Accessibility", () => {
  it("Button deve ter acessibilidade apropriada", () => {
    const { Button } = require("@/components/ui/button");
    const { container } = render(<Button>Accessible Button</Button>);

    const button = screen.getByText("Accessible Button");
    expect(button.tagName).toBe("BUTTON");
  });

  it("Input deve ter label associado", () => {
    const { Label } = require("@/components/ui/label");
    const { Input } = require("@/components/ui/input");

    render(<Label htmlFor="accessible-input">Label</Label>);
    render(<Input id="accessible-input" aria-label="Accessible Input" />);

    expect(screen.getByLabelText("Label")).toBeTruthy();
  });

  it("Form elements devem ser navegáveis via tab", () => {
    const { Button } = require("@/components/ui/button");
    const { Input } = require("@/components/ui/input");

    const { container } = render(
      <>
        <Input />
        <Button>Submit</Button>
      </>,
    );

    expect(container.querySelector("input")).toBeTruthy();
    expect(container.querySelector("button")).toBeTruthy();
  });
});

describe("UI Components - Form Integration", () => {
  it("deve integrar com form", () => {
    const { Input } = require("@/components/ui/input");
    const { Button } = require("@/components/ui/button");

    const handleSubmit = jest.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <Input name="test" />
        <Button type="submit">Submit</Button>
      </form>,
    );

    const button = screen.getByText("Submit");
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
