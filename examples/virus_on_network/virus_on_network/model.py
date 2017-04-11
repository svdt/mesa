import networkx as nx
import random

from decimal import Decimal

from mesa import Agent, Model
from mesa.time import RandomActivation
from mesa.space import MesaNetwork


class VirusAgent(Agent):
    """ A virus agent, which can be infected or not infected. """
    def __init__(self, pos, unique_id, model, infected=0):
        super().__init__(pos, model)
        self.unique_id = unique_id
        self.infected = infected

    def step(self):
        # if self.infected is exposed, then check if
            # becomes infected
            # get neighbors, and make them exposed

        pass

    def __str__(self):
        return "%s, %s" % (str(self.unique_id), self.infected)


class VirusModel(Model):
    """A virus model with some number of agents"""

    def __init__(self, N=150, avg_node_degree=3, initial_outbreak_size=10):

        self.N = N
        self.avg_node_degree = Decimal(avg_node_degree)
        self.schedule = RandomActivation(self)
        self.initial_outbreak_size = initial_outbreak_size

        self.network = MesaNetwork(N, avg_node_degree=self.avg_node_degree)   # create G
        G = self.network.graph

        # Create agents

        # create shuffle list of nodes to use in agent position
        nodes = G.nodes()
        random.shuffle(nodes)           # shuffling node ids list to randomize

        # TODO -- review -- which of this should be moved to "space"?
        for i in range(N):

            # is agent going to be infected?
            prob_of_infection = (initial_outbreak_size / N)
            if random.random() < prob_of_infection:
                infected = 1
            else:
                infected = 0

            # future location node of agent
            node = nodes.pop()

            agent = VirusAgent(node, i, self, infected)
            self.network.position_agent(agent, node)
            self.schedule.add(agent)

        self.running = True

        print(self.network.graph)

    def step(self):
        """Advance the model by one step."""
        '''
        Run one step of the model.
        '''
        self.schedule.step()
        # self.datacollector.collect(self)

