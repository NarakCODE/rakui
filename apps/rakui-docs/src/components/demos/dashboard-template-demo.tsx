"use client";

import { faker } from "@faker-js/faker";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Minus,
  ShoppingCart,
  Users,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatTrend,
  StatValue,
} from "@/components/ui/stat";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { useDataGrid } from "@/hooks/use-data-grid";

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
}

function generateOrders(): Order[] {
  return Array.from({ length: 20 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: faker.string.alphanumeric(8).toUpperCase(),
      customer: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      amount: faker.number.int({ min: 2500, max: 99900 }),
      status: faker.helpers.arrayElement([
        "completed",
        "pending",
        "failed",
        "refunded",
      ]),
      date: faker.date.recent({ days: 14 }).toISOString().split("T")[0],
    };
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
}

export function DashboardTemplateDemo() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [showBanner, setShowBanner] = React.useState(true);

  React.useEffect(() => {
    setOrders(generateOrders());
  }, []);

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "customer",
        accessorKey: "customer",
        header: "Customer",
        enableSorting: true,
        enableColumnFilter: true,
        meta: { cell: { variant: "short-text" } },
        minSize: 160,
      },
      {
        id: "amount",
        accessorKey: "amount",
        header: "Amount",
        enableSorting: true,
        enableColumnFilter: false,
        cell: ({ getValue }) => formatCurrency(getValue() as number),
        minSize: 100,
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        enableColumnFilter: true,
        meta: {
          cell: {
            variant: "select",
            options: [
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
              { label: "Refunded", value: "refunded" },
            ],
          },
        },
        cell: ({ getValue }) => {
          const value = getValue() as Order["status"];
          const variantMap: Record<Order["status"], Parameters<typeof Status>[0]["variant"]> = {
            completed: "success",
            pending: "warning",
            failed: "error",
            refunded: "info",
          };
          return (
            <Status variant={variantMap[value]}>
              <StatusIndicator />
              <StatusLabel className="capitalize">{value}</StatusLabel>
            </Status>
          );
        },
        minSize: 120,
      },
      {
        id: "date",
        accessorKey: "date",
        header: "Date",
        enableSorting: true,
        enableColumnFilter: false,
        minSize: 110,
      },
    ],
    [],
  );

  const {
    table,
    editingState,
    setEditingCell,
    updateCell,
    handleKeyDown,
  } = useDataGrid({
    columns,
    data: orders,
    onDataChange: setOrders,
    getRowId: (row) => row.id,
    initialState: {
      sorting: [{ id: "date", desc: true }],
    },
    enableSorting: true,
    enableFiltering: true,
  });

  const recentUsers = React.useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        name: faker.person.firstName(),
        initials: faker.string.alpha(2).toUpperCase(),
        role: faker.helpers.arrayElement(["Admin", "Editor", "Viewer"]),
      })),
    [],
  );

  return (
    <div className="w-full space-y-4">
      {showBanner && (
        <Banner variant="info" className="rounded-lg border">
          <BannerContent>
            <BannerTitle>New report available</BannerTitle>
            <BannerDescription>
              Your monthly analytics report is ready to download.
            </BannerDescription>
          </BannerContent>
          <BannerActions>
            <Button size="sm" variant="secondary">
              View report
            </Button>
            <BannerClose onClick={() => setShowBanner(false)} />
          </BannerActions>
        </Banner>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat>
          <StatLabel>Total revenue</StatLabel>
          <StatValue>$48,240</StatValue>
          <StatIndicator color="success" variant="icon">
            <DollarSign />
          </StatIndicator>
          <StatTrend trend="up">
            <ArrowUpRight />
            12.4% from last month
          </StatTrend>
          <StatDescription>
            14 enterprise renewals closed this cycle.
          </StatDescription>
        </Stat>

        <Stat>
          <StatLabel>Active users</StatLabel>
          <StatValue>1,284</StatValue>
          <StatIndicator color="info" variant="icon">
            <Users />
          </StatIndicator>
          <StatTrend trend="up">
            <ArrowUpRight />
            7.1% week over week
          </StatTrend>
          <StatDescription>
            New signups outpaced churn by 4.3x.
          </StatDescription>
        </Stat>

        <Stat>
          <StatLabel>Orders</StatLabel>
          <StatValue>342</StatValue>
          <StatIndicator color="default" variant="icon">
            <ShoppingCart />
          </StatIndicator>
          <StatTrend trend="neutral">
            <Minus />
            Flat vs. last week
          </StatTrend>
          <StatDescription>
            Conversion rate held steady at 3.2%.
          </StatDescription>
        </Stat>

        <Stat>
          <StatLabel>Refunds</StatLabel>
          <StatValue>$2,140</StatValue>
          <StatIndicator color="warning" variant="icon">
            <CreditCard />
          </StatIndicator>
          <StatTrend trend="down">
            <ArrowDownRight />
            2.1% of total volume
          </StatTrend>
          <StatDescription>
            Within acceptable threshold for the quarter.
          </StatDescription>
        </Stat>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>
              Latest transactions from the past 14 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataGrid
              table={table}
              editingState={editingState}
              onCellEdit={updateCell}
              onCellClick={(rowIndex, columnId) =>
                setEditingCell(rowIndex, columnId)
              }
              onKeyDown={handleKeyDown}
              height={300}
              enableSorting
              enableFiltering
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>Recently active members.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
