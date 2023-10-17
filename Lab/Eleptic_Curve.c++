#include <iostream>
#include <cstdint>

// Define the elliptic curve parameters
const int modulo = 13;

struct Point
{
    int x;
    int y;
};

// Function to calculate the modular inverse
int modInverse(int a, int m)
{
    int m0 = m;
    int x0 = 0;
    int x1 = 1;

    while (a > 1)
    {
        int q = a / m;
        int t = m;

        m = a % m;
        a = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0)
    {
        x1 += m0;
    }

    return x1;
}

// Function to add two points on the curve
Point add(Point p1, Point p2)
{
    Point result;
    int lambda;

    if (p1.x == p2.x && p1.y == p2.y)
    {
        // Point doubling
        lambda = (3 * p1.x * p1.x + 2) % modulo;
    }
    else
    {
        // Point addition
        int dy = (p2.y - p1.y) % modulo;
        int dx = (p2.x - p1.x) % modulo;
        lambda = (dy * modInverse(dx, modulo)) % modulo;
    }

    result.x = (lambda * lambda - p1.x - p2.x) % modulo;
    result.y = (lambda * (p1.x - result.x) - p1.y) % modulo;

    return result;
}

// Function to perform scalar multiplication
Point scalarMultiply(Point p, int n)
{
    Point result = {0, 0};
    while (n > 0)
    {
        if (n % 2 == 1)
        {
            result = add(result, p);
        }
        p = add(p, p);
        n /= 2;
    }
    return result;
}

int main()
{
    // Define the base point G
    Point G = {7, 3};

    // Define the scalar n
    int n = 18;

    // Calculate Q = n * G
    Point Q = scalarMultiply(G, n);

    std::cout << "Q = (" << Q.x << ", " << Q.y << ")" << std::endl;

    return 0;
}
